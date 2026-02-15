import fs from 'fs';
import path from 'path';
import vm from 'vm';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { BlogPost } from '../models/BlogPost.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');
const blogSourcePath = path.join(rootDir, 'client', 'data', 'blogPosts.ts');

const sanitizeSource = (source) => {
  let cleaned = source;
  cleaned = cleaned.replace(/export interface[\\s\\S]*?\\n}\\n/g, '');
  cleaned = cleaned.replace(/export const blogPosts: BlogPost\\[\\]\\s*=\\s*/g, 'const blogPosts = ');
  cleaned = cleaned.replace(/export const blogPosts\\s*=\\s*/g, 'const blogPosts = ');
  cleaned = cleaned.replace(/export interface[\\s\\S]*?\\n};?\\n/g, '');
  return cleaned;
};

const loadBlogPosts = () => {
  const source = fs.readFileSync(blogSourcePath, 'utf8');
  const cleaned = sanitizeSource(source);
  const sandbox = { result: null };
  const script = new vm.Script(`${cleaned}\nresult = blogPosts;`, { filename: 'blogPosts.vm' });
  vm.createContext(sandbox);
  script.runInContext(sandbox);
  return sandbox.result || [];
};

const connectDb = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required to seed blog posts.');
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

const seed = async () => {
  const posts = loadBlogPosts();
  if (!Array.isArray(posts) || posts.length === 0) {
    console.log('No blog posts found to seed.');
    return;
  }

  const results = [];
  for (const post of posts) {
    if (!post?.slug) continue;
    const update = { ...post };
    results.push(
      BlogPost.updateOne({ slug: post.slug }, { $set: update }, { upsert: true })
    );
  }

  await Promise.all(results);
  console.log(`Seeded ${results.length} blog posts.`);
};

try {
  await connectDb();
  await seed();
  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  console.error('Seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
}
