import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import cookieParser from 'cookie-parser';
import { Inquiry } from './models/Inquiry.js';
import { BlogPost } from './models/BlogPost.js';

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : undefined,
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

const mailEnabled = Boolean(
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.SMTP_FROM &&
  process.env.SMTP_TO
);

const transporter = mailEnabled
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

const sendMail = async ({ to, subject, html, replyTo }) => {
  if (!mailEnabled || !transporter) {
    return;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
    replyTo,
  });
};

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

app.post('/api/inquiry', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const inquiry = await Inquiry.create({
      firstName,
      lastName,
      email,
      message,
    });

    // 1. Send Admin Notification (Non-blocking)
    sendMail({
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `New Inquiry: ${firstName} ${lastName}`,
      html: getAdminEmailTemplate({ firstName, lastName, email, message }),
    }).catch((err) => console.error('Failed to send admin email:', err));

    // 2. Send Welcome Email (Non-blocking)
    sendMail({
      to: email,
      replyTo: process.env.SMTP_TO,
      subject: `Welcome to ${BUSINESS_NAME}, ${firstName}!`,
      html: getWelcomeEmailTemplate({ firstName, lastName }),
    }).catch((err) => console.error('Failed to send user auto-reply:', err));

    // 3. Send Inquiry Acknowledgement (Non-blocking)
    sendMail({
      to: email,
      replyTo: process.env.SMTP_TO,
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

app.post('/api/admin/login', (req, res) => {
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

app.post('/api/admin/posts', requireAdmin, async (req, res) => {
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

    if (!title || !excerpt || !author || !category || !featuredImage?.src || !featuredImage?.alt) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

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

app.put('/api/admin/posts/:id', requireAdmin, async (req, res) => {
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
