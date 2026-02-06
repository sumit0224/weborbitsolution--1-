import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import nodemailer from 'nodemailer';
import { Inquiry } from './models/Inquiry.js';
import { Order } from './models/Order.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.SERVER_PORT || 4000);

const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
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

const razorpayEnabled = Boolean(
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
);

const razorpay = razorpayEnabled
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

const currency = process.env.RAZORPAY_CURRENCY || 'USD';
const planCatalog = {
  launch: {
    id: 'launch',
    name: 'Launch',
    amount: Number(process.env.PLAN_LAUNCH_AMOUNT || 1550000),
    currency,
  },
  orbit: {
    id: 'orbit',
    name: 'Orbit',
    amount: Number(process.env.PLAN_ORBIT_AMOUNT || 2980000),
    currency,
  },
};

const sendMail = async ({ subject, html, replyTo }) => {
  if (!mailEnabled || !transporter) {
    return;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject,
    html,
    replyTo,
  });
};

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

    await sendMail({
      subject: `New inquiry from ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    res.json({ ok: true, id: inquiry._id });
  } catch (error) {
    console.error('Inquiry error:', error);
    res.status(500).json({ error: 'Failed to submit inquiry.' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    if (!razorpay || !razorpayEnabled) {
      return res.status(500).json({ error: 'Razorpay is not configured.' });
    }

    const { planId, customer = {} } = req.body || {};
    const plan = planCatalog[planId];

    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan selected.' });
    }

    const order = await razorpay.orders.create({
      amount: plan.amount,
      currency: plan.currency,
      receipt: `wo_${Date.now()}`,
      notes: {
        planId: plan.id,
        planName: plan.name,
        customerEmail: customer.email || '',
      },
    });

    await Order.create({
      planId: plan.id,
      planName: plan.name,
      amount: plan.amount,
      currency: plan.currency,
      status: 'created',
      orderId: order.id,
      customer,
    });

    res.json({
      orderId: order.id,
      amount: plan.amount,
      currency: plan.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      planName: plan.name,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order.' });
  }
});

app.post('/api/orders/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    } = req.body || {};

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ error: 'Missing payment confirmation.' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid payment signature.' });
    }

    const orderDoc = await Order.findOneAndUpdate(
      { orderId },
      {
        status: 'paid',
        paymentId,
        signature,
        paidAt: new Date(),
      },
      { new: true }
    );

    if (!orderDoc) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    await sendMail({
      subject: `Payment received for ${orderDoc.planName}`,
      html: `
        <h2>Payment Confirmed</h2>
        <p><strong>Plan:</strong> ${orderDoc.planName}</p>
        <p><strong>Order ID:</strong> ${orderDoc.orderId}</p>
        <p><strong>Payment ID:</strong> ${orderDoc.paymentId}</p>
        <p><strong>Customer:</strong> ${orderDoc.customer?.name || 'N/A'}</p>
        <p><strong>Email:</strong> ${orderDoc.customer?.email || 'N/A'}</p>
      `,
    });

    res.json({ ok: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed.' });
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
