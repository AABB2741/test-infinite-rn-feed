import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./styles";

interface IndicatorContainerProps {
  children?: React.ReactNode;
  position?: "absolute" | "relative";
}

export function IndicatorContainer({
  children,
  position = "relative",
}: IndicatorContainerProps) {
  return (
    <SafeAreaView style={[styles.container, { position }]}>
      {children}
    </SafeAreaView>
  );
}
