import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { Inquiry } from './models/Inquiry.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.SERVER_PORT || 4000);

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));

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

const getUserAutoReplyTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>${getBaseStyles()}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>WebOrbit Solution</h1>
    </div>
    <div class="content">
      <h2 style="margin:0 0 12px;font-size:22px;color:#ffffff;">Hello ${data.firstName},</h2>
      <p>Thank you for reaching out to us. We have received your inquiry and will review it shortly.</p>
      <p>A member of our team will get back to you within 24 hours.</p>
      
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
      <p style="margin:0 0 6px;">WebOrbit Solution | Premium Web Agency</p>
      <p style="margin:0;">Sector-128, Noida</p>
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
    }).catch(err => console.error("Failed to send admin email:", err));

    // 2. Send User Auto-Reply (Non-blocking)
    sendMail({
      to: email,
      replyTo: process.env.SMTP_TO,
      subject: `We received your message - WebOrbit Solution`,
      html: getUserAutoReplyTemplate({ firstName, lastName, message }),
    }).catch(err => console.error("Failed to send user auto-reply:", err));

    res.json({ ok: true, id: inquiry._id });
  } catch (error) {
    console.error('Inquiry error:', error);
    res.status(500).json({ error: 'Failed to submit inquiry.' });
  }
});

const start = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is required.');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server start failed:', error);
    process.exit(1);
  }
};

start();
