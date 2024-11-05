import type { VideoFeedItem } from "@/schemas/feed-item/video";
import { useVideoPlayer, VideoView } from "expo-video";

interface VideoFeedItemRendererProps extends VideoFeedItem {}

export function VideoFeedItemRenderer({
  author,
  videoUrl,
}: VideoFeedItemRendererProps) {
  const videoPlayer = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
  });

  return <VideoView player={videoPlayer} />;
}
