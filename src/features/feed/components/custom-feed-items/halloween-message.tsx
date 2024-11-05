import { Text } from "react-native";
import type { CustomItem } from "../../get-random-custom-feed-items";

export const halloween_message: CustomItem = {
  criteria: () => {
    const d = new Date();
    return d.getDate() === 3 && d.getMonth() === 10;
  },
  content: {
    type: "custom",
    render: HalloweenMessage,
  },
  canRepeat: false,
};

export function HalloweenMessage() {
  return <Text>Feliz dia das bruxas!</Text>;
}
