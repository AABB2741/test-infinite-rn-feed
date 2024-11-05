import { Text } from "react-native";

import type { CustomFeedItem } from "@/schemas/feed-item/custom";

export const ad: Omit<CustomFeedItem, "id"> = {
  criteria: async () => Math.random() >= 0.5,
  type: "custom",
  render: AdCustomFeedItem,
};

export function AdCustomFeedItem() {
  return <Text>Ad</Text>;
}
