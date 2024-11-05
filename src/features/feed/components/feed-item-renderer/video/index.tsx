import type { VideoFeedItem } from "@/schemas/feed-item/video";
import { ResizeMode, Video } from "expo-av";
import { useEffect, useRef } from "react";
import { Text } from "react-native";
import { styles } from "./styles";

interface VideoFeedItemRendererProps extends VideoFeedItem {
  isVisible: boolean;
}

export function VideoFeedItemRenderer({
  author,
  videoUrl,
  isVisible,
}: VideoFeedItemRendererProps) {
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
        ref={videoRef}
      />
    </>
  );
}
