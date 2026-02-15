import mongoose from 'mongoose';
import { seedBlogPosts } from '../utils/seedBlogPosts.js';

const connectDb = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required to seed blog posts.');
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

try {
  await connectDb();
  await seedBlogPosts();
  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  console.error('Seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
}
