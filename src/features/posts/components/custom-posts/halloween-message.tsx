import { Text } from "react-native";

import type { CustomPost } from "@/schemas/post/custom";

export const halloween_message: Omit<CustomPost, "id"> = {
  criteria: async () => {
    const d = new Date();
    return d.getDate() === 31 && d.getMonth() === 9;
  },
  type: "custom",
  Component: HalloweenMessage,
};

export function HalloweenMessage() {
  return <Text>Feliz dia das bruxas!</Text>;
}
