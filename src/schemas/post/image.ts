import { z } from "zod";
import { interactablePostSchema } from "./interactable";

export const imagePostSchema = z.intersection(
  interactablePostSchema,
  z.object({
    id: z.string().uuid(),
    type: z.literal("image"),
    author: z.object({
      avatarUrl: z.string().url(),
      name: z.string(),
      id: z.string().uuid(),
    }),
    imageUrl: z.string().url(),
    width: z.number(),
    height: z.number(),
  }),
);

export type ImagePost = z.infer<typeof imagePostSchema>;
