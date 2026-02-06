import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    paragraphs: { type: [String], default: [] },
    bullets: { type: [String], default: [] },
  },
  { _id: false }
);

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    featuredImage: {
      src: { type: String, required: true, trim: true },
      alt: { type: String, required: true, trim: true },
    },
    sections: { type: [sectionSchema], default: [] },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BlogPost = mongoose.model('BlogPost', blogPostSchema);
