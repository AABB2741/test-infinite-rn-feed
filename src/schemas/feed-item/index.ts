import { z } from "zod";

import { customFeedItemSchema } from "./custom";
import { imageFeedItemSchema } from "./image";
import { videoFeedItemSchema } from "./video";

export const feedItem = z.union([
  imageFeedItemSchema,
  videoFeedItemSchema,
  customFeedItemSchema,
]);

export type FeedItem = z.infer<typeof feedItem>;
