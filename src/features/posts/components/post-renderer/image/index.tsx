import { memo } from "react";
import { Image, ScrollView, Text } from "react-native";

import type { ImagePost } from "@/schemas/post/image";

import { PostControls } from "../../post-controls";
import { styles } from "./styles";

interface ImagePostRendererProps extends ImagePost {}

export const ImagePostRenderer = memo<ImagePostRendererProps>(
  ({ id, author, imageUrl, width, height, ...interactions }) => {
    console.log(`Rendering image: ${id.substring(0, 5)}`);

    return (
      <>
        <Text style={styles.contentAuthor}>
          {author.name} ({id.substring(0, 5)})
        </Text>
        <ScrollView style={styles.container}>
          <Image
            resizeMode="contain"
            style={{
              width: "100%",
              aspectRatio: width / height,
            }}
            source={{ uri: imageUrl }}
          />
        </ScrollView>
        <PostControls.Interactions {...interactions} />
      </>
    );
  },
);
