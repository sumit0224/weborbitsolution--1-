import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { BlogPost } from '../models/BlogPost.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');
const blogSourcePath = path.join(rootDir, 'client', 'data', 'blogPosts.ts');

const sanitizeSource = (source) => {
  let cleaned = source;
  cleaned = cleaned.replace(/export interface[\s\S]*?\n}\n/g, '');
  cleaned = cleaned.replace(/export const blogPosts: BlogPost\[\]\s*=\s*/g, 'const blogPosts = ');
  cleaned = cleaned.replace(/export const blogPosts\s*=\s*/g, 'const blogPosts = ');
  cleaned = cleaned.replace(/export interface[\s\S]*?\n};?\n/g, '');
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

export const seedBlogPosts = async ({ mode } = {}) => {
  const seedMode = mode === 'upsert' || process.env.BLOG_SEED_MODE === 'upsert' ? 'upsert' : 'insert-missing';
  const posts = loadBlogPosts();
  if (!Array.isArray(posts) || posts.length === 0) {
    console.log('Seed: no blog posts found.');
    return;
  }

  const operations = [];
  for (const post of posts) {
    if (!post?.slug) {
      continue;
    }

    const update = { ...post };
    const updatePayload = seedMode === 'upsert' ? { $set: update } : { $setOnInsert: update };
    operations.push({
      updateOne: {
        filter: { slug: post.slug },
        update: updatePayload,
        upsert: true,
      },
    });
  }

  if (operations.length === 0) {
    console.log('Seed: no valid blog posts to process.');
    return;
  }

  const result = await BlogPost.bulkWrite(operations, { ordered: false });
  const inserted = Number(result.upsertedCount || 0);

  if (seedMode === 'upsert') {
    const modified = Number(result.modifiedCount || 0);
    const matched = Number(result.matchedCount || 0);
    console.log(`Seed mode: upsert. Inserted ${inserted}, modified ${modified}, matched ${matched}.`);
    return;
  }

  const skippedExisting = operations.length - inserted;
  console.log(`Seed mode: insert-missing. Inserted ${inserted}, skipped existing ${skippedExisting}.`);
};
