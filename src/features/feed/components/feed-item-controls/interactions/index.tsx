import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

import type { InteractableFeedItem } from "@/schemas/feed-item/interactable";

import { styles } from "./styles";

interface InteractionsFeedItemControl extends InteractableFeedItem {}

export function InteractionsFeedItemControl({
  likesCount,
  dislikesCount,
  commentsCount,
}: InteractionsFeedItemControl) {
  const [commentsContainerIndex, setCommentsContainerIndex] = useState(-1);

  const commentsContainerRef = useRef<BottomSheet | null>(null);

  function handleSwitchCommentsVisibility() {
    setCommentsContainerIndex((prevState) => (prevState === -1 ? 1 : -1));
  }

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handleSwitchCommentsVisibility}
      >
        <Text>Likes: {likesCount}</Text>
        <Text>Dislikes: {dislikesCount}</Text>
        <Text>Comments: {commentsCount}</Text>
      </TouchableOpacity>

      <BottomSheet
        enablePanDownToClose
        snapPoints={["70%"]}
        index={commentsContainerIndex}
        ref={commentsContainerRef}
      >
        <BottomSheetScrollView>
          <Text>Comment 1</Text>
          <Text>Comment 1</Text>
          <Text>Comment 1</Text>
          <Text>Comment 1</Text>
          <Text>Comment 1</Text>
          <Text>Comment 1</Text>
          <Text>Comment 1</Text>
          <Text>Comment 1</Text>
          <Text>Comment 1</Text>
          <Text>Comment 1</Text>
          <Text>Comment 1</Text>
          <Text>Comment 1</Text>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
}
