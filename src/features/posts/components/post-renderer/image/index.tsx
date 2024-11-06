import { memo, useMemo } from "react";
import { Image, ScrollView, Text, useWindowDimensions } from "react-native";

import type { ImagePost } from "@/schemas/post/image";
import { resize } from "@/utils/resize";

import { PostControls } from "../../post-controls";
import { styles } from "./styles";

interface ImagePostRendererProps extends ImagePost {}

export const ImagePostRenderer = memo<ImagePostRendererProps>(
  ({ id, author, imageUrl, width, height, ...interactions }) => {
    console.log(`Rendering image: ${id.substring(0, 5)}`);

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
        <Text style={styles.contentAuthor}>
          {author.name} ({id.substring(0, 5)})
        </Text>
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
  },
);
