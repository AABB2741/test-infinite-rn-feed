import { useMemo } from "react";
import { Image, ScrollView, Text, useWindowDimensions } from "react-native";

import type { ImagePost } from "@/schemas/post/image";
import { resize } from "@/utils/resize";

import { PostControls } from "../../post-controls";
import { styles } from "./styles";

interface ImagePostRendererProps extends ImagePost {}

export function ImagePostRenderer({
  author,
  imageUrl,
  width,
  height,
  ...interactions
}: ImagePostRendererProps) {
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
      <PostControls.Interactions {...interactions} />
    </>
  );
}
