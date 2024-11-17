import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 24,
    overflow: "hidden",
  },
  contentAuthor: {},
  videoContainer: {
    width: "100%",
    minHeight: 1,
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    minHeight: 1,
    flexShrink: 1,
  },
  slider: {
    width: "100%",
    height: 30,
  },
  pausedIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
