import { type ReactElement } from "react";
import { z } from "zod";

export const customPostSchema = z.object({
  id: z.string().uuid(),
  type: z.literal("custom"),
  criteria: z.function().returns(z.promise(z.boolean())),
  render: z.function().returns(z.custom<ReactElement>(() => true)),
});

export type CustomPost = z.infer<typeof customPostSchema>;
