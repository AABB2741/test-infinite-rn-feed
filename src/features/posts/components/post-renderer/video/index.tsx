import { ResizeMode, Video } from "expo-av";
import { memo, useState } from "react";
import { View } from "react-native";

import type { VideoPost } from "@/schemas/post/video";

import { PostControls } from "../../post-controls";
import { styles } from "./styles";

interface VideoPostRendererProps extends VideoPost {
  isVisible: boolean;
  index: number;
}

export const VideoPostRenderer = memo<VideoPostRendererProps>(
  ({ id, author, videoUrl, isVisible, index, ...interactions }) => {
    console.log(`Rendering video: ${id.substring(0, 5)}`);
    const [videoAspectRatio, setVideoAspectRatio] = useState<number>();

    return (
      <View style={styles.container}>
        <PostControls.Author avatarUrl={author.avatarUrl} name={author.name} />
        <Video
          source={{ uri: videoUrl }}
          resizeMode={ResizeMode.CONTAIN}
          style={[styles.video, { aspectRatio: videoAspectRatio }]}
          shouldPlay={isVisible}
          positionMillis={0}
          useNativeControls
          isLooping
          onReadyForDisplay={({ naturalSize }) => {
            setVideoAspectRatio(naturalSize.width / naturalSize.height);
          }}
        />
        <PostControls.Interactions {...interactions} />
      </View>
    );
  },
);
