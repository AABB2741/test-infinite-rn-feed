import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./styles";

interface LoadingProps {
  message?: string;
  /**
   * ```typescript
   * {
   *  10000: "We're still here. Hold on a little longer.", // will be shown after 10 seconds
   *  30000: "Looks like we had a problem. Try restarting the all", // will be shown after 30 seconds
   * }
   * ```
   */
  tooLongLoading?: Record<number, string>;
}

export function Loading({ message, tooLongLoading }: LoadingProps) {
  const [tooLongLoadingMessage, setTooLongLoadingMessage] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!tooLongLoading) {
      return;
    }

    for (const [delay, message] of Object.entries(tooLongLoading)) {
      setTimeout(() => setTooLongLoadingMessage(message), parseInt(delay));
    }
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      {message && <Text>{message}</Text>}
      {tooLongLoadingMessage && <Text>{tooLongLoadingMessage}</Text>}
    </View>
  );
}
