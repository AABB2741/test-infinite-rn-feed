import { ResizeMode, Video } from "expo-av";
import { useEffect, useRef } from "react";
import { Text } from "react-native";

import type { VideoPost } from "@/schemas/post/video";

import { PostControls } from "../../post-controls";
import { styles } from "./styles";

interface VideoPostRendererProps extends VideoPost {
  isVisible: boolean;
}

export function VideoPostRenderer({
  author,
  videoUrl,
  isVisible,
  ...interactions
}: VideoPostRendererProps) {
  const videoRef = useRef<Video | null>(null);

  useEffect(() => {
    if (isVisible) {
      videoRef.current?.playFromPositionAsync(0)?.catch(console.error);
    }
  }, [isVisible]);

  return (
    <>
      <Text style={styles.contentAuthor}>{author.name}</Text>
      <Video
        source={{ uri: videoUrl }}
        resizeMode={ResizeMode.CONTAIN}
        style={styles.video}
        shouldPlay={isVisible}
        useNativeControls
        isLooping
        ref={videoRef}
      />
      <PostControls.Interactions {...interactions} />
    </>
  );
}
