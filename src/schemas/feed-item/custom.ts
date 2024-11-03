import { type ReactElement } from "react";
import { z } from "zod";

export const customFeedItemSchema = z.object({
  id: z.string().uuid(),
  type: z.literal("custom"),
  render: z.function().returns(z.custom<ReactElement>(() => true)),
});

export type CustomFeedItem = z.infer<typeof customFeedItemSchema>;
