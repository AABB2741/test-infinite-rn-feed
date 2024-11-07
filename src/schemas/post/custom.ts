import { type ReactElement, type ReactNode } from "react";
import { z } from "zod";

export const customPostComponentPropsSchema = z.object({
  isVisible: z.boolean(),
  onRequestNextPost: z.function().optional(),
});

export type CustomPostComponentProps = z.infer<
  typeof customPostComponentPropsSchema
>;

export const customPostComponentSchema = z
  .function()
  .args(customPostComponentPropsSchema)
  .returns(z.custom<ReactElement | ReactNode>(() => true));

export type CustomPostComponent = z.infer<typeof customPostComponentSchema>;

export const customPostSchema = z.object({
  id: z.string().uuid(),
  type: z.literal("custom"),
  criteria: z.function().returns(z.promise(z.boolean())),
  Component: customPostComponentSchema,
});

export type CustomPost = z.infer<typeof customPostSchema>;
