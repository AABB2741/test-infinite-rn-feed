import Slider from "@react-native-community/slider";
import { ResizeMode, Video } from "expo-av";
import { Pause, Play } from "lucide-react-native";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

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
    const [isPlaying, setIsPlaying] = useState(true);

    const videoRef = useRef<Video>(null);
    const sliderRef = useRef<Slider | null>(null);

    const videoPositionInMsRef = useRef(0);
    const pausedIconScale = useSharedValue(0);

    const animatedPausedIcon = useAnimatedStyle(() => ({
      transform: [{ scale: pausedIconScale.value }],
    }));

    const setVideoPosition = useCallback(async (value: number) => {
      await videoRef.current?.setPositionAsync(value);
    }, []);

    useEffect(() => {
      if (isVisible) {
        videoRef.current?.setPositionAsync(0);
        setIsPlaying(true);
      }
    }, [isVisible]);

    useEffect(() => {
      if (isPlaying) {
        pausedIconScale.value = withTiming(0, { duration: 200 });
      } else {
        pausedIconScale.value = withSpring(1, { duration: 200 });
      }
    }, [isPlaying]);

    return (
      <View style={styles.container}>
        <PostControls.Author avatarUrl={author.avatarUrl} name={author.name} />
        <Pressable
          style={styles.videoContainer}
          onPress={() => setIsPlaying((prevState) => !prevState)}
        >
          <Video
            source={{ uri: videoUrl }}
            resizeMode={ResizeMode.CONTAIN}
            style={[styles.video, { aspectRatio: videoAspectRatio }]}
            shouldPlay={isPlaying && isVisible}
            useNativeControls={false}
            isLooping
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded) {
                videoPositionInMsRef.current = status.positionMillis;
                sliderRef.current?.setNativeProps({
                  value: status.positionMillis,
                });
              }
            }}
            onReadyForDisplay={({ naturalSize, status }) => {
              setVideoAspectRatio(naturalSize.width / naturalSize.height);

              if (status?.isLoaded) {
                sliderRef.current?.setNativeProps({
                  maximumValue: status.durationMillis,
                });
              }
            }}
            ref={videoRef}
          />

          <Animated.View style={[styles.pausedIndicator, animatedPausedIcon]}>
            {isPlaying ? (
              <Play size={24} color="#fff" />
            ) : (
              <Pause size={24} color="#fff" />
            )}
          </Animated.View>
        </Pressable>
        <Slider
          style={styles.slider}
          minimumTrackTintColor="dodgerblue"
          maximumTrackTintColor="gray"
          thumbTintColor="dodgerblue"
          onValueChange={setVideoPosition}
          // @ts-ignore
          ref={sliderRef}
        />

        <PostControls.Interactions {...interactions} />
      </View>
    );
  },
);
