import { Schema, models, model } from 'mongoose'

export interface IBlogPost {
  _id?: string
  slug: string
  title: string
  author: string
  date: Date
  image: string
  excerpt: string
  category: string
  content: string
  published: boolean
  createdAt?: Date
  updatedAt?: Date
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    image: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const BlogPost =
  models.BlogPost || model<IBlogPost>('BlogPost', BlogPostSchema)

export default BlogPost