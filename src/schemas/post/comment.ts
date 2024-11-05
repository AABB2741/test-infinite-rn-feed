import { z } from "zod";

export const postCommentSchema = z.object({
  id: z.string().uuid(),
  author: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
  interactions: z.object({
    likesCount: z.number().int().nonnegative(),
    dislikesCount: z.number().int().nonnegative(),
    repliesCount: z.number().int().nonnegative(),
  }),
  createdAt: z.date(),
  message: z.string(),
});

export type PostComment = z.infer<typeof postCommentSchema>;
