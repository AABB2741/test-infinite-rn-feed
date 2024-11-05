import { z } from "zod";
import { interactableFeedItemSchema } from "./interactable";

export const imageFeedItemSchema = z.intersection(
  interactableFeedItemSchema,
  z.object({
    id: z.string().uuid(),
    type: z.literal("image"),
    author: z.object({
      name: z.string(),
      id: z.string().uuid(),
    }),
    imageUrl: z.string().url(),
    width: z.number(),
    height: z.number(),
  }),
);

export type ImageFeedItem = z.infer<typeof imageFeedItemSchema>;
