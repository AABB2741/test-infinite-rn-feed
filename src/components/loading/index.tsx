import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./styles";

interface LoadingProps {
  message?: string;
}

export function Loading({ message }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      {message && <Text>{message}</Text>}
    </View>
  );
}
