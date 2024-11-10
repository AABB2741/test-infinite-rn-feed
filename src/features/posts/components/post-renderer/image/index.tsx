import { memo } from "react";
import { Image, ScrollView } from "react-native";

import type { ImagePost } from "@/schemas/post/image";

import { PostControls } from "../../post-controls";
import { styles } from "./styles";

interface ImagePostRendererProps extends ImagePost {
  index: number;
}

export const ImagePostRenderer = memo<ImagePostRendererProps>(
  ({ id, author, imageUrl, width, height, index, ...interactions }) => {
    console.log(`Rendering image: ${id.substring(0, 5)}`);

    return (
      <>
        <PostControls.Author avatarUrl={author.avatarUrl} name={author.name} />
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
