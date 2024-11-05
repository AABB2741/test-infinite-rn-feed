import { z } from "zod";

export const videoFeedItemSchema = z.object({
  type: z.literal("video"),
  id: z.string().uuid(),
  author: z.object({
    name: z.string(),
    id: z.string().uuid(),
  }),
  videoUrl: z.string().url(),
});

export type VideoFeedItem = z.infer<typeof videoFeedItemSchema>;
