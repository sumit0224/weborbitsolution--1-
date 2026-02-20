import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import crypto from 'crypto';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import { Inquiry } from './models/Inquiry.js';
import { BlogPost } from './models/BlogPost.js';
import { Order } from './models/Order.js';
import { sendEmail } from './utils/brevoEmail.js';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const baseOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const devOrigins = process.env.NODE_ENV === 'production' ? [] : ['http://localhost:3000', 'http://localhost:5173'];
const allowedOrigins = [...new Set([...baseOrigins, ...devOrigins])];
const normalizeOrigin = (origin) => String(origin || '').trim().replace(/\/+$/, '');
const isLocalOrigin = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(String(origin || '').trim());

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(mongoSanitize());
app.use(hpp());

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : undefined,
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(uploadDir, { maxAge: '365d' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' },
});

const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many form submissions. Please try again later.' },
});

app.use('/api/', apiLimiter);

const mailEnabled = Boolean(process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL);
const adminNotifyEmail = process.env.BREVO_ADMIN_EMAIL || process.env.SMTP_TO || '';

const sendMail = async ({ to, subject, html, replyTo }) => {
  if (!mailEnabled || !to) {
    return;
  }

  const result = await sendEmail({
    to: { email: to },
    subject,
    html,
    replyTo: replyTo ? { email: replyTo } : undefined,
  });

  if (!result.ok) {
    throw new Error(result.error || 'Brevo send failed.');
  }
};

const uploadStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const suffix = crypto.randomBytes(8).toString('hex');
    cb(null, `${Date.now()}-${suffix}${ext}`);
  },
});

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'));
    }
    return cb(null, true);
  },
});

const getPublicBaseUrl = (req) =>
  process.env.SERVER_PUBLIC_URL || `${req.protocol}://${req.get('host')}`;

// --- Admin Session Helpers ---

const SESSION_COOKIE = 'wo_admin';
const SESSION_DAYS = Number(process.env.ADMIN_SESSION_DAYS || 7);
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const COOKIE_SAMESITE = process.env.COOKIE_SAMESITE || 'lax';
const COOKIE_SECURE = process.env.COOKIE_SECURE === 'true';

const safeCompare = (value, expected) => {
  const a = Buffer.from(String(value));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
};

const createSessionToken = (email) => {
  const payload = {
    email,
    exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  };
  const base = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(base).digest('base64url');
  return `${base}.${signature}`;
};

const verifySessionToken = (token) => {
  if (!token || !SESSION_SECRET) return null;
  const [base, signature] = token.split('.');
  if (!base || !signature) return null;
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(base).digest('base64url');
  if (!safeCompare(signature, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(base, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch (error) {
    return null;
  }
};

const setSessionCookie = (res, token) => {
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: COOKIE_SAMESITE,
    secure: COOKIE_SECURE,
    maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
    path: '/',
  });
};

const clearSessionCookie = (res) => {
  res.cookie(SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: COOKIE_SAMESITE,
    secure: COOKIE_SECURE,
    maxAge: 0,
    path: '/',
  });
};

const requireAdmin = (req, res, next) => {
  const token = req.cookies[SESSION_COOKIE];
  const payload = verifySessionToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.admin = payload;
  next();
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const stripTags = (value) => String(value || '').replace(/<[^>]*>/g, '').trim();

const cleanText = (max) =>
  z
    .string()
    .transform((val) => stripTags(val))
    .refine((val) => val.length >= 1 && val.length <= max, {
      message: `Must be between 1 and ${max} characters.`,
    });

const optionalText = (max) =>
  z
    .string()
    .optional()
    .transform((val) => (val ? stripTags(val) : undefined))
    .refine((val) => !val || val.length <= max, {
      message: `Must be ${max} characters or less.`,
    });

const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid request payload.', issues: result.error.flatten() });
  }
  req.body = result.data;
  return next();
};

const inquirySchema = z.object({
  firstName: cleanText(60),
  lastName: cleanText(60),
  email: z.string().email().transform((val) => val.toLowerCase()),
  message: cleanText(2000),
});

const adminLoginSchema = z.object({
  email: z.string().email().transform((val) => val.toLowerCase()),
  password: z.string().min(8).max(128),
});

const payuCreateSchema = z.object({
  planId: z.enum(['launch', 'orbit']),
  customer: z.object({
    name: cleanText(120),
    email: z.string().email().transform((val) => val.toLowerCase()),
    phone: z.string().min(6).max(20),
  }),
});

const postSectionSchema = z.object({
  heading: cleanText(140),
  paragraphs: z.array(cleanText(2000)).default([]),
  bullets: z.array(cleanText(200)).optional(),
});

const blogPostSchema = z.object({
  title: cleanText(140),
  slug: optionalText(140),
  excerpt: cleanText(300),
  date: optionalText(32),
  readTime: optionalText(40),
  author: cleanText(120),
  category: cleanText(120),
  featuredImage: z.object({
    src: z.string().url(),
    alt: cleanText(160),
  }),
  sections: z.array(postSectionSchema).optional(),
  metaTitle: optionalText(160),
  metaDescription: optionalText(200),
  published: z.boolean().optional(),
});

const blogPostUpdateSchema = blogPostSchema.partial();

// --- PayU Config ---

const PAYU_KEY = process.env.PAYU_MERCHANT_KEY || '';
const PAYU_SALT = process.env.PAYU_MERCHANT_SALT || '';
const PAYU_BASE_URL = process.env.PAYU_BASE_URL || 'https://test.payu.in/_payment';
const PAYU_ALLOWED_HOSTS = new Set(['test.payu.in', 'secure.payu.in']);
const PAYU_CURRENCY = process.env.PAYU_CURRENCY || 'INR';
const SERVER_PUBLIC_URL = process.env.SERVER_PUBLIC_URL || '';
const PAYMENT_CLIENT_URL = process.env.PAYMENT_CLIENT_URL || '';
const PAYMENTS_PROXY_SECRET = process.env.PAYMENTS_PROXY_SECRET || '';
const PRIMARY_CLIENT_ORIGIN = normalizeOrigin(
  PAYMENT_CLIENT_URL || allowedOrigins.find((origin) => !isLocalOrigin(origin)) || allowedOrigins[0] || ''
);
const PAYU_SURL =
  process.env.PAYU_SURL || (SERVER_PUBLIC_URL ? `${SERVER_PUBLIC_URL}/api/payments/payu/success` : '');
const PAYU_FURL =
  process.env.PAYU_FURL || (SERVER_PUBLIC_URL ? `${SERVER_PUBLIC_URL}/api/payments/payu/failure` : '');

const PAYU_PLAN_AMOUNTS = {
  launch: Number(process.env.PAYU_PLAN_LAUNCH_AMOUNT || 0),
  orbit: Number(process.env.PAYU_PLAN_ORBIT_AMOUNT || 0),
};

const PAYU_PLANS = {
  launch: { id: 'launch', name: 'Launch', amount: PAYU_PLAN_AMOUNTS.launch },
  orbit: { id: 'orbit', name: 'Orbit', amount: PAYU_PLAN_AMOUNTS.orbit },
};

const formatAmount = (value) => {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount.toFixed(2);
};

const sha512 = (value) => crypto.createHash('sha512').update(value).digest('hex');

const isTrustedPayuBaseUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' && PAYU_ALLOWED_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
};

const hasValidPaymentsProxyRequest = (req) => {
  if (!PAYMENTS_PROXY_SECRET) return true;
  const provided = String(req.get('x-payments-proxy') || '');
  return safeCompare(provided, PAYMENTS_PROXY_SECRET);
};

const createPayuRequestHash = ({ key, txnid, amount, productinfo, firstname, email, udf1 = '', udf2 = '', udf3 = '', udf4 = '', udf5 = '' }) => {
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${PAYU_SALT}`;
  return sha512(hashString);
};

const verifyPayuResponseHash = (payload) => {
  const {
    status = '',
    email = '',
    firstname = '',
    productinfo = '',
    amount = '',
    txnid = '',
    key = '',
    udf1 = '',
    udf2 = '',
    udf3 = '',
    udf4 = '',
    udf5 = '',
    additionalCharges = '',
    hash = '',
  } = payload;

  const reverseBase = `${PAYU_SALT}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
  const reverseString = additionalCharges ? `${additionalCharges}|${reverseBase}` : reverseBase;
  return sha512(reverseString) === String(hash);
};

const ensurePayuConfigured = () => {
  if (!PAYU_KEY || !PAYU_SALT) {
    return { ok: false, error: 'PayU credentials are not configured.' };
  }
  if (!PAYU_BASE_URL || !/^https?:\/\//i.test(PAYU_BASE_URL)) {
    return { ok: false, error: 'PayU base URL is not configured correctly.' };
  }
  if (!isTrustedPayuBaseUrl(PAYU_BASE_URL)) {
    return { ok: false, error: 'PayU base URL must use a trusted PayU domain.' };
  }
  if (!PAYU_SURL || !PAYU_FURL) {
    return { ok: false, error: 'PayU redirect URLs are not configured.' };
  }
  if (!formatAmount(PAYU_PLAN_AMOUNTS.launch) || !formatAmount(PAYU_PLAN_AMOUNTS.orbit)) {
    return { ok: false, error: 'PayU plan amounts are not configured.' };
  }
  return { ok: true };
};

const buildClientRedirect = (status, txnid) => {
  if (!PRIMARY_CLIENT_ORIGIN) return '';
  const params = new URLSearchParams({ status, txnid: txnid || '' });
  return `${PRIMARY_CLIENT_ORIGIN}/payment-status?${params.toString()}`;
};

// --- Email Templates ---

const getBaseStyles = () => `
  body { font-family: 'Inter', Arial, sans-serif; line-height: 1.7; color: #ffffff; background-color: #000000; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 24px auto; background: #0b0b0b; border: 1px solid #1f2937; overflow: hidden; }
  .header { padding: 28px 24px; border-bottom: 1px solid #1f2937; text-align: left; }
  .header h1 { margin: 0; font-size: 20px; letter-spacing: 0.28em; text-transform: uppercase; color: #20B2AA; }
  .content { padding: 28px 24px; color: #d1d5db; font-size: 15px; }
  .field { margin-bottom: 20px; }
  .label { font-size: 11px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.3em; margin-bottom: 6px; display: block; }
  .value { font-size: 16px; color: #ffffff; font-weight: 600; }
  .message-box { background: #000000; padding: 18px 20px; border: 1px solid #1f2937; border-left: 4px solid #20B2AA; margin-top: 10px; font-style: normal; color: #d1d5db; }
  .footer { background-color: #0b0b0b; padding: 20px; text-align: center; font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.22em; border-top: 1px solid #1f2937; }
  .button { display: inline-block; padding: 12px 24px; background-color: #20B2AA; color: #000000; text-decoration: none; border-radius: 2px; font-weight: 700; margin-top: 20px; text-transform: uppercase; letter-spacing: 0.3em; font-size: 11px; }
`;

const getAdminEmailTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>${getBaseStyles()}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Inquiry</h1>
    </div>
    <div class="content">
      <p>You have received a new message from the contact form.</p>
      
      <div class="field">
        <span class="label">Name</span>
        <div class="value">${data.firstName} ${data.lastName}</div>
      </div>
      
      <div class="field">
        <span class="label">Email</span>
        <div class="value"><a href="mailto:${data.email}" style="color: #20B2AA; text-decoration: none;">${data.email}</a></div>
      </div>
      
      <div class="field">
        <span class="label">Message</span>
        <div class="message-box">
          ${data.message.replace(/\n/g, '<br />')}
        </div>
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} WebOrbit Solution Admin System
    </div>
  </div>
</body>
</html>
`;

const BUSINESS_NAME = 'WebOrbitSolution';
const BUSINESS_EMAIL = 'hello@weborbitsolution.in';
const BUSINESS_PHONE = '+91 9310513770';
const BUSINESS_ADDRESS = 'Sector-128, Noida';

const getWelcomeEmailTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>${getBaseStyles()}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${BUSINESS_NAME}</h1>
    </div>
    <div class="content">
      <h2 style="margin:0 0 12px;font-size:22px;color:#ffffff;">Hi ${data.firstName},</h2>
      <p>Welcome to ${BUSINESS_NAME} — we’re glad you’re here.</p>
      <p>
        We help startups and growing businesses with website development, web & app solutions, UI/UX design, digital
        marketing, SEO, and IT support.
      </p>
      <p>If you have a project in mind or need help choosing the right service, just reply to this email.</p>

      <div style="text-align: center;">
        <a href="${process.env.CLIENT_ORIGIN?.split(',')[0]}" class="button">Visit Our Website</a>
      </div>
    </div>
    <div class="footer">
      <p style="margin:0 0 6px;">${BUSINESS_NAME}</p>
      <p style="margin:0;">${BUSINESS_EMAIL} | ${BUSINESS_PHONE}</p>
    </div>
  </div>
</body>
</html>
`;

const getInquiryReplyTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>${getBaseStyles()}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${BUSINESS_NAME}</h1>
    </div>
    <div class="content">
      <h2 style="margin:0 0 12px;font-size:22px;color:#ffffff;">Hello ${data.firstName},</h2>
      <p>Thank you for contacting ${BUSINESS_NAME}. We’ve received your inquiry and our team is reviewing the details.</p>
      <p>A specialist will reach out within 24 hours.</p>
      <p>If needed, we’ll schedule a quick call to understand your goals.</p>
      
      <hr style="border: 0; border-top: 1px solid #1f2937; margin: 30px 0;">
      
      <div class="field">
        <span class="label">Your Message</span>
        <div class="message-box" style="font-size: 14px;">
          ${data.message.replace(/\n/g, '<br />')}
        </div>
      </div>
      
      <div style="text-align: center;">
        <a href="${process.env.CLIENT_ORIGIN?.split(',')[0]}" class="button">Visit Our Website</a>
      </div>
    </div>
    <div class="footer">
      <p style="margin:0 0 6px;">${BUSINESS_NAME}</p>
      <p style="margin:0;">${BUSINESS_ADDRESS}</p>
    </div>
  </div>
</body>
</html>
`;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// --- PayU Payments ---

app.post('/api/payments/payu/create', validateBody(payuCreateSchema), async (req, res) => {
  try {
    if (!hasValidPaymentsProxyRequest(req)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const configCheck = ensurePayuConfigured();
    if (!configCheck.ok) {
      return res.status(500).json({ error: configCheck.error });
    }

    const { planId, customer } = req.body || {};
    const plan = PAYU_PLANS[planId];

    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan selected.' });
    }

    const amount = formatAmount(plan.amount);
    if (!amount) {
      return res.status(500).json({ error: 'Plan amount is not configured.' });
    }

    const name = String(customer?.name || '').trim();
    const email = String(customer?.email || '').trim().toLowerCase();
    const phone = String(customer?.phone || '').trim();

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Customer name, email, and phone are required.' });
    }

    const txnid = `WO${Date.now()}${crypto.randomBytes(4).toString('hex')}`;
    const firstname = name.split(' ')[0] || name;
    const productinfo = `${plan.name} Plan`;

    const order = await Order.create({
      planId: plan.id,
      planName: plan.name,
      amount: Number(amount),
      currency: PAYU_CURRENCY,
      status: 'created',
      orderId: txnid,
      customer: {
        name,
        email,
        phone,
      },
    });

    const udf1 = plan.id;
    const udf2 = order._id.toString();
    const udf3 = '';
    const udf4 = '';
    const udf5 = '';

    const hash = createPayuRequestHash({
      key: PAYU_KEY,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
    });

    res.json({
      ok: true,
      paymentUrl: PAYU_BASE_URL,
      params: {
        key: PAYU_KEY,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone,
        surl: PAYU_SURL,
        furl: PAYU_FURL,
        service_provider: 'payu_paisa',
        udf1,
        udf2,
        udf3,
        udf4,
        udf5,
        hash,
      },
    });
  } catch (error) {
    console.error('PayU create error:', error);
    res.status(500).json({ error: 'Unable to start payment.' });
  }
});

const handlePayuCallback = async (req, res, fallbackStatus) => {
  try {
    const payload = req.body || {};
    const txnid = String(payload.txnid || '').trim();
    const status = String(payload.status || fallbackStatus || 'failed').toLowerCase();
    const keyMatches = String(payload.key || '').trim() === PAYU_KEY;
    const isHashValid = keyMatches && verifyPayuResponseHash(payload);

    if (!txnid) {
      return res.status(400).json({ error: 'Missing transaction id.' });
    }

    const order = await Order.findOne({ orderId: txnid });
    if (!order) {
      const unknownOrderRedirect = buildClientRedirect('failure', txnid);
      if (unknownOrderRedirect) {
        return res.redirect(302, unknownOrderRedirect);
      }
      return res.status(404).json({ error: 'Order not found.' });
    }

    if (!isHashValid) {
      const invalidSignatureRedirect = buildClientRedirect('verification_failed', txnid);
      if (invalidSignatureRedirect) {
        return res.redirect(302, invalidSignatureRedirect);
      }
      return res.status(400).json({ error: 'Invalid callback signature.' });
    }

    const amountMatches = Number(payload.amount || 0).toFixed(2) === order.amount.toFixed(2);
    const payuSaysSuccess = status === 'success';
    let redirectStatus = 'failure';

    if (payuSaysSuccess && amountMatches) {
      await Order.updateOne(
        { _id: order._id, status: { $ne: 'paid' } },
        {
          status: 'paid',
          paymentId: payload.mihpayid || payload.paymentId || null,
          signature: payload.hash || null,
          paidAt: new Date(),
        }
      );
      redirectStatus = 'success';
    } else if (payuSaysSuccess && !amountMatches) {
      if (order.status !== 'paid') {
        await Order.updateOne(
          { _id: order._id, status: { $ne: 'paid' } },
          {
            status: 'failed',
            paymentId: payload.mihpayid || payload.paymentId || null,
            signature: payload.hash || null,
            paidAt: null,
          }
        );
      }
      redirectStatus = 'verification_failed';
    } else {
      if (order.status !== 'paid') {
        await Order.updateOne(
          { _id: order._id, status: { $ne: 'paid' } },
          {
            status: 'failed',
            paymentId: payload.mihpayid || payload.paymentId || null,
            signature: payload.hash || null,
            paidAt: null,
          }
        );
      }
      redirectStatus = 'failure';
    }

    const redirectUrl = buildClientRedirect(redirectStatus, txnid);
    if (redirectUrl) {
      return res.redirect(302, redirectUrl);
    }

    return res.json({
      ok: redirectStatus === 'success',
      orderId: txnid,
      status: redirectStatus,
      verified: true,
    });
  } catch (error) {
    console.error('PayU callback error:', error);
    return res.status(500).json({ error: 'Payment verification failed.' });
  }
};

app.post('/api/payments/payu/success', (req, res) => handlePayuCallback(req, res, 'success'));
app.post('/api/payments/payu/failure', (req, res) => handlePayuCallback(req, res, 'failure'));

app.get('/api/payments/payu/status/:txnid', async (req, res) => {
  try {
    if (!hasValidPaymentsProxyRequest(req)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const txnid = String(req.params.txnid || '').trim();
    if (!/^WO\d+[a-f0-9]{8}$/i.test(txnid)) {
      return res.status(400).json({ error: 'Invalid transaction id.' });
    }

    const order = await Order.findOne({ orderId: txnid }).select(
      'orderId status planId planName amount currency paidAt createdAt updatedAt'
    );
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    return res.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.error('PayU status lookup error:', error);
    return res.status(500).json({ error: 'Unable to fetch payment status.' });
  }
});

app.post('/api/inquiry', formLimiter, validateBody(inquirySchema), async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    const inquiry = await Inquiry.create({
      firstName,
      lastName,
      email,
      message,
    });

    // 1. Send Admin Notification (Non-blocking)
    sendMail({
      to: adminNotifyEmail,
      replyTo: email,
      subject: `New Inquiry: ${firstName} ${lastName}`,
      html: getAdminEmailTemplate({ firstName, lastName, email, message }),
    }).catch((err) => console.error('Failed to send admin email:', err));

    // 2. Send Welcome Email (Non-blocking)
    sendMail({
      to: email,
      replyTo: adminNotifyEmail,
      subject: `Welcome to ${BUSINESS_NAME}, ${firstName}!`,
      html: getWelcomeEmailTemplate({ firstName, lastName }),
    }).catch((err) => console.error('Failed to send user auto-reply:', err));

    // 3. Send Inquiry Acknowledgement (Non-blocking)
    sendMail({
      to: email,
      replyTo: adminNotifyEmail,
      subject: `We received your request — ${BUSINESS_NAME}`,
      html: getInquiryReplyTemplate({ firstName, lastName, message }),
    }).catch((err) => console.error('Failed to send inquiry reply:', err));

    res.json({ ok: true, id: inquiry._id });
  } catch (error) {
    console.error('Inquiry error:', error);
    res.status(500).json({ error: 'Failed to submit inquiry.' });
  }
});

// --- Admin Auth ---

app.post('/api/admin/login', authLimiter, validateBody(adminLoginSchema), (req, res) => {
  const { email, password } = req.body || {};

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !SESSION_SECRET) {
    return res.status(500).json({ error: 'Admin login is not configured.' });
  }

  if (!safeCompare(email, ADMIN_EMAIL) || !safeCompare(password, ADMIN_PASSWORD)) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = createSessionToken(email);
  setSessionCookie(res, token);
  res.json({ ok: true, admin: { email } });
});

app.post('/api/admin/logout', (req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

app.get('/api/admin/me', (req, res) => {
  const token = req.cookies[SESSION_COOKIE];
  const payload = verifySessionToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ ok: true, admin: { email: payload.email } });
});

// --- Blog Public ---

app.get('/api/blog/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true })
      .sort({ date: -1 })
      .select('title slug excerpt date readTime author category featuredImage');
    res.json({ posts });
  } catch (error) {
    console.error('Fetch posts error:', error);
    res.status(500).json({ error: 'Failed to load posts.' });
  }
});

app.get('/api/blog/posts/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    res.json({ post });
  } catch (error) {
    console.error('Fetch post error:', error);
    res.status(500).json({ error: 'Failed to load post.' });
  }
});

// --- Blog Admin ---

app.get('/api/admin/posts', requireAdmin, async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });
    res.json({ posts });
  } catch (error) {
    console.error('Admin posts error:', error);
    res.status(500).json({ error: 'Failed to load posts.' });
  }
});

app.post('/api/admin/uploads', requireAdmin, formLimiter, (req, res) => {
  upload.single('image')(req, res, (error) => {
    if (error) {
      return res.status(400).json({ error: error.message || 'Upload failed.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }
    const baseUrl = getPublicBaseUrl(req);
    const url = `${baseUrl}/uploads/${req.file.filename}`;
    res.json({ url, filename: req.file.filename });
  });
});

app.post('/api/admin/posts', requireAdmin, formLimiter, validateBody(blogPostSchema), async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      date,
      readTime,
      author,
      category,
      featuredImage,
      sections,
      metaTitle,
      metaDescription,
      published = true,
    } = req.body || {};

    const finalSlug = slug ? slugify(slug) : slugify(title);
    const finalDate = date || new Date().toISOString().split('T')[0];

    const post = await BlogPost.create({
      title,
      slug: finalSlug,
      excerpt,
      date: finalDate,
      readTime: readTime || '5 min read',
      author,
      category,
      featuredImage,
      sections: sections || [],
      metaTitle,
      metaDescription,
      published,
    });

    res.status(201).json({ post });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post.' });
  }
});

app.put('/api/admin/posts/:id', requireAdmin, formLimiter, validateBody(blogPostUpdateSchema), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.slug) {
      updates.slug = slugify(updates.slug);
    }
    if (updates.title && !updates.slug) {
      updates.slug = slugify(updates.title);
    }

    const post = await BlogPost.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    res.json({ post });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ error: 'Failed to update post.' });
  }
});

app.delete('/api/admin/posts/:id', requireAdmin, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post.' });
  }
});

let mongoPromise;

export const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (mongoose.connection.readyState === 2 && mongoPromise) {
    await mongoPromise;
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required.');
  }

  mongoPromise = mongoose.connect(process.env.MONGODB_URI);
  await mongoPromise;
};

export default app;
