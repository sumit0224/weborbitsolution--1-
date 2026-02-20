import dotenv from 'dotenv';
import app, { connectDb } from './app.js';
import { seedBlogPosts } from './utils/seedBlogPosts.js';

dotenv.config();

const PORT = Number(process.env.PORT || process.env.SERVER_PORT || 4000);
const shouldSeedBlogOnBoot = process.env.SEED_BLOG_ON_BOOT === 'true';
const seedMode = process.env.BLOG_SEED_MODE || 'insert-missing';

const start = async () => {
  try {
    await connectDb();
    console.log('MongoDB connected');

    if (shouldSeedBlogOnBoot) {
      try {
        await seedBlogPosts({ mode: seedMode });
      } catch (error) {
        console.error('Blog seed failed:', error);
      }
    } else {
      console.log('Blog seed skipped on boot. Set SEED_BLOG_ON_BOOT=true to enable.');
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
