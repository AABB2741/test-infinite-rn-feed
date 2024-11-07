import { Text } from "react-native";

import type { CustomPost } from "@/schemas/post/custom";

export const ad: Omit<CustomPost, "id"> = {
  criteria: async () => Math.random() >= 0.5,
  type: "custom",
  Component: AdCustomPost,
};

export function AdCustomPost() {
  return <Text>Ad</Text>;
}
