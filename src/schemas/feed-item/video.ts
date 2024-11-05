import { z } from "zod";
import { interactableFeedItemSchema } from "./interactable";

export const videoFeedItemSchema = z.intersection(
  interactableFeedItemSchema,
  z.object({
    id: z.string().uuid(),
    type: z.literal("video"),
    videoUrl: z.string().url(),
    author: z.object({
      name: z.string(),
      id: z.string().uuid(),
    }),
  }),
);

export type VideoFeedItem = z.infer<typeof videoFeedItemSchema>;
