import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useWindowDimensions,
  View,
  type ListRenderItemInfo,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";

import type { Post } from "@/schemas/post";

import { PostRenderer } from "../post-renderer";
import { styles } from "./styles";

interface PostsFeedProps {
  /**
   * Determines the distance from the index to the end to start loading new
   * posts.
   *
   * Defaults to `3`
   */
  loadMargin?: number;
  posts: Post[];
  isNextPageAvailable?: boolean;
  /**
   * Defines the width of the feed. If not passed, it will use device's window
   * width
   */
  width?: number;
  onRequestMorePosts?: () => void;
}

export function PostsFeed({
  posts,
  width,
  loadMargin = 3,
  isNextPageAvailable,
  onRequestMorePosts,
}: PostsFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const postsFeedRef = useRef<SwiperFlatList | null>(null);
  const { width: windowWidth } = useWindowDimensions();

  const feedWidth = useMemo(() => width ?? windowWidth, [width, windowWidth]);

  useEffect(() => {
    const distanceFromEndOfPosts = posts.length - currentIndex;

    const shouldRequestMorePosts =
      isNextPageAvailable &&
      (!posts.length || distanceFromEndOfPosts <= loadMargin);

    if (shouldRequestMorePosts) {
      onRequestMorePosts?.();
    }
  }, [isNextPageAvailable, currentIndex, loadMargin]);

  const renderInfo = useCallback(
    ({ item, index }: ListRenderItemInfo<Post>) => (
      <View
        style={[styles.contentContainer, { width: feedWidth }]}
        key={item.id}
      >
        {item.type === "image" && (
          <PostRenderer.Image index={index} {...item} />
        )}
        {item.type === "video" && (
          <PostRenderer.Video
            index={index}
            {...item}
            isVisible={index === currentIndex}
          />
        )}
        {item.type === "custom" && (
          <item.Component
            isVisible={index === currentIndex}
            onRequestNextPost={() =>
              postsFeedRef.current?.scrollToIndex({ index: currentIndex + 1 })
            }
          />
        )}
      </View>
    ),
    [currentIndex, postsFeedRef],
  );

  return (
    <>
      <SwiperFlatList
        index={currentIndex}
        onChangeIndex={({ index }) => setCurrentIndex(index)}
        data={posts}
        keyExtractor={(item: Post) => item.id}
        renderItem={renderInfo}
        ref={postsFeedRef}
      />
    </>
  );
}
