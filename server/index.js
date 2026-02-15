import dotenv from 'dotenv';
import app, { connectDb } from './app.js';
import { seedBlogPosts } from './utils/seedBlogPosts.js';

dotenv.config();

const PORT = Number(process.env.PORT || process.env.SERVER_PORT || 4000);

const start = async () => {
  try {
    await connectDb();
    console.log('MongoDB connected');

    try {
      await seedBlogPosts();
    } catch (error) {
      console.error('Blog seed failed:', error);
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server start failed:', error);
    process.exit(1);
  }
};

start();
