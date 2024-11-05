import { useMemo } from "react";
import { Image, ScrollView, Text, useWindowDimensions } from "react-native";

import type { ImageFeedItem } from "@/schemas/feed-item/image";
import { resize } from "@/utils/resize";

import { FeedItemControls } from "../../feed-item-controls";
import { styles } from "./styles";

interface ImageFeedItemRendererProps extends ImageFeedItem {}

export function ImageFeedItemRenderer({
  author,
  imageUrl,
  width,
  height,
  ...interactions
}: ImageFeedItemRendererProps) {
  const { width: windowWidth } = useWindowDimensions();

  const { imageWidth, imageHeight } = useMemo(() => {
    const { newWidth, newHeight } = resize({
      from: {
        width,
        height,
      },
      to: {
        width: windowWidth,
      },
    });

    return {
      imageWidth: newWidth,
      imageHeight: newHeight,
    };
  }, [width, height, windowWidth]);

  return (
    <>
      <Text style={styles.contentAuthor}>{author.name}</Text>
      <ScrollView style={styles.container}>
        <Image
          resizeMode="contain"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
          source={{ uri: imageUrl }}
        />
      </ScrollView>
      <FeedItemControls.Interactions {...interactions} />
    </>
  );
}
