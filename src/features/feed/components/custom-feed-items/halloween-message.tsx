import { Text } from "react-native";

import type { CustomFeedItem } from "@/schemas/feed-item/custom";

export const halloween_message: Omit<CustomFeedItem, "id"> = {
  criteria: async () => {
    const d = new Date();
    return d.getDate() === 31 && d.getMonth() === 9;
  },
  type: "custom",
  render: HalloweenMessage,
};

export function HalloweenMessage() {
  return <Text>Feliz dia das bruxas!</Text>;
}
