import { View } from "react-native";

import { styles } from "./styles";

interface IndicatorContainerProps {
  children?: React.ReactNode;
}

export function IndicatorContainer({ children }: IndicatorContainerProps) {
  <View style={styles.container}>{children}</View>;
}
