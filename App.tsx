import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Feed } from "./src/app/feed";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Feed />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
