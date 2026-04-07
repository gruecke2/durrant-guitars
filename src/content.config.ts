import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const catalog = defineCollection({
    loader: glob({ pattern: "**/*.{json,yaml}", base: "./src/content/catalog" }),
    schema: ({ image }) => z.object({
        name: z.string(),
        slug: z.string(),
        style: z.string(),
        tagline: z.string(),
        description: z.string(),
        startingPrice: z.number(),
        specs: z.any(),
        images: z.array(image()),
    }),
});

const available = defineCollection({
    loader: glob({ pattern: "**/*.{json,yaml}", base: "./src/content/available" }),
    schema: ({ image }) => z.object({
        name: z.string(),
        slug: z.string(),
        model: z.string(),
        price: z.number(),
        status: z.enum(['available', 'sold']),
        description: z.string(),
        stripePaymentLink: z.string().url().optional(),
        images: z.array(image()),
        specs: z.any(),
    }),
});

const gallery = defineCollection({
    loader: glob({ pattern: "**/*.{json,yaml}", base: "./src/content/gallery" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        model: z.string().optional(),
        description: z.string().optional(),
        images: z.array(image()),
        date: z.string().optional()
    })
});

const testimonials = defineCollection({
    loader: glob({ pattern: "**/*.{json,yaml}", base: "./src/content/testimonials" }),
    schema: ({ image }) => z.object({
        name: z.string(),
        role: z.string().optional(),
        quote: z.string(),
        photo: image().optional(),
        order: z.number().optional(),
    }),
});

const posts = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx,mdoc}", base: "./src/content/posts" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.coerce.date(),
        excerpt: z.string(),
        coverImage: image().optional(),
        draft: z.boolean().default(false),
    }),
});

export const collections = { catalog, available, testimonials, gallery, posts };
