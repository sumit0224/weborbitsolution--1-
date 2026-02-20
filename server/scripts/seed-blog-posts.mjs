import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seedBlogPosts } from '../utils/seedBlogPosts.js';

dotenv.config();

const connectDb = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required to seed blog posts.');
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

try {
  await connectDb();
  const mode = process.env.BLOG_SEED_MODE || 'upsert';
  await seedBlogPosts({ mode });
  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  console.error('Seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
}
