import { ResizeMode, Video } from "expo-av";
import { memo } from "react";
import { Text } from "react-native";

import type { VideoPost } from "@/schemas/post/video";

import { PostControls } from "../../post-controls";
import { styles } from "./styles";

interface VideoPostRendererProps extends VideoPost {
  isVisible: boolean;
}

export const VideoPostRenderer = memo<VideoPostRendererProps>(
  ({ id, author, videoUrl, isVisible, ...interactions }) => {
    console.log(`Rendering video: ${id.substring(0, 5)}`);

    return (
      <>
        <Text style={styles.contentAuthor}>
          {author.name} ({id.substring(0, 5)})
        </Text>
        <Video
          source={{ uri: videoUrl }}
          resizeMode={ResizeMode.CONTAIN}
          style={styles.video}
          shouldPlay={isVisible}
          positionMillis={0}
          useNativeControls
          isLooping
        />
        <PostControls.Interactions {...interactions} />
      </>
    );
  },
);
