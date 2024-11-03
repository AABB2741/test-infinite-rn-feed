import { z } from "zod";

export const imageFeedItemSchema = z.object({
  type: z.literal("image"),
  id: z.string().uuid(),
  author: z.object({
    name: z.string(),
    id: z.string().uuid(),
  }),
  imageUrl: z.string().url(),
  width: z.number(),
  height: z.number(),
});

export type ImageFeedItem = z.infer<typeof imageFeedItemSchema>;
