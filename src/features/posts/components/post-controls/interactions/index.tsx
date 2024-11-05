import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { fetchPostComments } from "@/features/posts/api/fetch-post-comments";
import type { PostComment } from "@/schemas/post/comment";
import type { InteractablePost } from "@/schemas/post/interactable";

import { styles } from "./styles";

interface InteractionsPostControl extends InteractablePost {}

export function InteractionsPostControl({
  likesCount,
  dislikesCount,
  commentsCount,
}: InteractionsPostControl) {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<PostComment[] | null>(null);
  const [commentsContainerIndex, setCommentsContainerIndex] = useState(-1);

  const commentsContainerRef = useRef<BottomSheet | null>(null);

  const areCommentsVisible = commentsContainerIndex !== -1;

  const loadMoreComments = useCallback(async () => {
    setIsLoading(true);

    try {
      const { postComments } = await fetchPostComments({ limit: 10 });

      setComments((prevState) =>
        prevState ? [...prevState, ...postComments] : postComments,
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading || !areCommentsVisible || comments) {
      return;
    }

    loadMoreComments().catch(console.error);
  }, [isLoading, areCommentsVisible, comments]);

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
        <BottomSheetFlatList
          data={comments ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.message}</Text>
            </View>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!isLoading) {
              loadMoreComments();
            }
          }}
        />
      </BottomSheet>
    </>
  );
}
