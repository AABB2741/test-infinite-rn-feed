import { z } from "zod";

import { customPostSchema } from "./custom";
import { imagePostSchema } from "./image";
import { videoPostSchema } from "./video";

export const post = z.union([
  imagePostSchema,
  videoPostSchema,
  customPostSchema,
]);

export type Post = z.infer<typeof post>;
