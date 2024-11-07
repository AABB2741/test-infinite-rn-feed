import { type AVPlaybackSource } from "expo-av";
import { memo, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import type {
  CustomPost,
  CustomPostComponentProps,
} from "@/schemas/post/custom";

import carlinhosJpg from "@/features/posts/assets/carlinhos/carlinhos.jpg";
import { useSoundEffect } from "../../hooks/use-sound-effect";

const ambienceSoundsImports: AVPlaybackSource[] = [
  require("@/features/posts/assets/carlinhos/ambience-1.mp3"),
  require("@/features/posts/assets/carlinhos/ambience-2.mp3"),
  require("@/features/posts/assets/carlinhos/ambience-3.mp3"),
  require("@/features/posts/assets/carlinhos/ambience-4.mp3"),
];

const INITIAL_DISTANCE = 10000;

export const CarlinhosCustomPost = memo<CustomPostComponentProps>(
  ({ isVisible, onRequestNextPost }) => {
    const [distance, setDistance] = useState(INITIAL_DISTANCE);

    const ambienceAudioSource = useMemo(
      () =>
        ambienceSoundsImports[
          Math.round(Math.random() * (ambienceSoundsImports.length - 1))
        ],
      [isVisible],
    );

    const ambienceSound = useSoundEffect(ambienceAudioSource);

    useEffect(() => {
      if (!isVisible) {
        ambienceSound?.stopAsync();
        return;
      }

      if (distance > 0) {
        ambienceSound
          ?.playAsync()
          .catch((err) => console.error("Não foi possível tocar o áudio", err));
      }

      const interval = setInterval(
        () =>
          setDistance((prevState) => {
            if (prevState <= 0) {
              clearInterval(interval);
              return 0;
            }

            return prevState - 12;
          }),
        1,
      );

      return () => clearInterval(interval);
    }, [isVisible]);

    useEffect(() => {
      if (distance <= 0) {
        ambienceSound?.stopAsync();
        onRequestNextPost?.();
      }
    }, [distance]);

    return (
      <View style={[styles.container]}>
        {distance > 0 && (
          <>
            <Image style={styles.image} source={carlinhosJpg} />
            <Text style={styles.text}>
              Carlinhos está a{" "}
              <Text style={styles.bold}>{distance} metros</Text> de distância
              até a sua localização. (Ele está se aproximando).
            </Text>
          </>
        )}
        {distance <= 0 && <Text style={styles.text}>Ele está aqui.</Text>}
      </View>
    );
  },
);

export const carlinhos: Omit<CustomPost, "id"> = {
  criteria: async () => Math.random() >= 0.5,
  type: "custom",
  Component: CarlinhosCustomPost,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  text: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
});
