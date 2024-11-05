import { z } from "zod";

import { customFeedItemSchema } from "./custom";
import { imageFeedItemSchema } from "./image";

export const feedItem = z.union([imageFeedItemSchema, customFeedItemSchema]);

export type FeedItem = z.infer<typeof feedItem>;

export const mediaFeedItem = imageFeedItemSchema;

export type MediaFeedItem = z.infer<typeof mediaFeedItem>;
