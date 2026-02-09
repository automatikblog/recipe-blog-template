import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const webstories = defineCollection({
  loader: glob({ base: "./src/content/webstories", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string(),
    publish_status: z.enum(['publish', 'draft']).default('publish'),
    logo_url: z.string(),
    cta_text: z.string().optional(),
    cta_link: z.string().optional(),
    cta_position: z.enum(['all_pages', 'last_page', 'none']).default('all_pages'),
    cta_color: z.string().default('#3B82F6'),
    poster_portrait: z.string(),
    poster_square: z.string().optional(),
    ads: z.object({
      publisher_code: z.string().optional(),
      ad_slot: z.string().optional(),
    }).optional(),
    pages: z.array(z.object({
      image_url: z.string(),
      page_title: z.string().optional(),
      page_text: z.string().optional(),
    })),
    createdAt: z.coerce.date().optional(),
  }),
});

export const collections = { blog, webstories };
