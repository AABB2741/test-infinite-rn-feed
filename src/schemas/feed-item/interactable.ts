import { z } from "zod";

export const interactableFeedItemSchema = z.object({
  likesCount: z.number().int().nonnegative(),
  dislikesCount: z.number().int().nonnegative(),
  commentsCount: z.number().int().nonnegative(),
});

export type InteractableFeedItem = z.infer<typeof interactableFeedItemSchema>;
