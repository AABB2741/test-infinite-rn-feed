import { useEffect, useMemo, useState } from "react";
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

  const { width: windowWidth } = useWindowDimensions();

  const feedWidth = useMemo(() => width ?? windowWidth, [width, windowWidth]);

  useEffect(() => {
    const distanceFromEndOfPosts = posts.length - currentIndex;

    const shouldRequestMorePosts =
      isNextPageAvailable &&
      (!posts.length || distanceFromEndOfPosts <= loadMargin);

    console.log("should", shouldRequestMorePosts);

    if (shouldRequestMorePosts) {
      onRequestMorePosts?.();
    }
  }, [isNextPageAvailable, currentIndex, loadMargin]);

  return (
    <>
      <SwiperFlatList
        index={currentIndex}
        onChangeIndex={({ index, prevIndex }) => setCurrentIndex(index)}
        data={posts}
        keyExtractor={(item: Post) => item.id}
        renderItem={({ item, index }: ListRenderItemInfo<Post>) => (
          <View
            style={[styles.contentContainer, { width: feedWidth }]}
            key={item.id}
          >
            {item.type === "image" && <PostRenderer.Image {...item} />}
            {item.type === "video" && (
              <PostRenderer.Video
                {...item}
                isVisible={index === currentIndex}
              />
            )}
            {item.type === "custom" && item.render()}
          </View>
        )}
      />
    </>
  );
}