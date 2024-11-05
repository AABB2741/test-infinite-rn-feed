import { Text, type TextProps } from "react-native";

import { styles } from "./styles";

interface IndicatorTextProps extends TextProps {}

export function IndicatorText(props: IndicatorTextProps) {
  return <Text style={styles.text} {...props} />;
}
