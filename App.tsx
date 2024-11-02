import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { Feed } from "./src/app/feed";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Feed />
    </View>
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
