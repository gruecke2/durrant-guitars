import { defineCollection, z } from 'astro:content';

const catalog = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    slug: z.string(),
    style: z.string(),
    tagline: z.string(),
    description: z.string(),
    startingPrice: z.number(),
    specs: z.record(z.string()),
    images: z.array(image()),
  }),
});

const available = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    slug: z.string(),
    model: z.string(),
    price: z.number(),
    status: z.enum(['available', 'sold']),
    description: z.string(),
    stripePaymentLink: z.string().url().optional(),
    images: z.array(image()),
    specs: z.record(z.string()),
  }),
});

const gallery = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    title: z.string(),
    model: z.string().optional(),
    description: z.string().optional(),
    images: z.array(image()),
    date: z.string().optional()
  })
});

const testimonials = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string().optional(),
    quote: z.string(),
    photo: image().optional(),
    order: z.number().optional(),
  }),
});
const posts = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    coverImage: image().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { catalog, available, testimonials, gallery, posts };
