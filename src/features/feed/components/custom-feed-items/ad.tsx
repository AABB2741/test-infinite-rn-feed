import { Text } from "react-native";
import type { CustomItem } from "../../get-random-custom-feed-items";

export const ad: CustomItem = {
  criteria: () => Math.random() >= 0.5,
  content: {
    type: "custom",
    render: AdCustomFeedItem,
  },
  canRepeat: true,
};

export function AdCustomFeedItem() {
  return <Text>Ad</Text>;
}
