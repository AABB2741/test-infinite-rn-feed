import { z } from "zod";
import { interactablePostSchema } from "./interactable";

export const videoPostSchema = z.intersection(
  interactablePostSchema,
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

export type VideoPost = z.infer<typeof videoPostSchema>;
