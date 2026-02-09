import app, { connectDb } from '../app.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    await connectDb();
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    return res.status(500).json({ error: 'Database connection failed.' });
  }

  return app(req, res);
}
