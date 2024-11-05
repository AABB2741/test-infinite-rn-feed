import { z } from "zod";

export const interactablePostSchema = z.object({
  likesCount: z.number().int().nonnegative(),
  dislikesCount: z.number().int().nonnegative(),
  commentsCount: z.number().int().nonnegative(),
});

export type InteractablePost = z.infer<typeof interactablePostSchema>;
