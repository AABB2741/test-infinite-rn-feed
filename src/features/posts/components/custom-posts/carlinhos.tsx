import { Audio, type AVPlaybackSource } from "expo-av";
import type { Sound } from "expo-av/build/Audio";
import { memo, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import type {
  CustomPost,
  CustomPostComponentProps,
} from "@/schemas/post/custom";

import carlinhosJpg from "@/features/posts/assets/carlinhos/carlinhos.jpg";
import powerOutageMp3 from "@/features/posts/assets/carlinhos/power-outage.mp3";

const ambienceSoundsImports: (() => AVPlaybackSource)[] = [
  () => require("@/features/posts/assets/carlinhos/ambience-1.mp3"),
  () => require("@/features/posts/assets/carlinhos/ambience-2.mp3"),
  () => require("@/features/posts/assets/carlinhos/ambience-3.mp3"),
];

const INITIAL_DISTANCE = 10000;

export const CarlinhosCustomPost = memo<CustomPostComponentProps>(
  ({ isVisible }) => {
    const [distance, setDistance] = useState(INITIAL_DISTANCE);
    const [ambienceSound, setAmbienceSound] = useState<Sound | null>(null);
    const [powerOutageSound, setPowerOutageSound] = useState<Sound | null>(
      null,
    );

    async function playAmbienceSound() {
      const getAudioSource =
        ambienceSoundsImports[
          Math.round(Math.random() * (ambienceSoundsImports.length - 1))
        ];

      const { sound } = await Audio.Sound.createAsync(getAudioSource());

      setAmbienceSound(sound);

      await sound.playAsync();
    }

    useEffect(() => {
      if (!isVisible) {
        setDistance(INITIAL_DISTANCE);
        powerOutageSound?.stopAsync();
        ambienceSound?.stopAsync();
        return;
      }

      playAmbienceSound();
      const interval = setInterval(
        () =>
          setDistance((prevState) => {
            if (prevState <= 0) {
              clearInterval(interval);
              return 0;
            }

            return prevState - 10;
          }),
        1,
      );

      return () => clearInterval(interval);
    }, [isVisible]);

    useEffect(() => {
      if (distance <= 0) {
        ambienceSound?.stopAsync();
        Audio.Sound.createAsync(powerOutageMp3).then(({ sound }) => {
          setPowerOutageSound(sound);
          sound.playAsync();
        });
      }
    }, [distance]);

    return (
      <View style={[styles.container, distance <= 0 && styles.redContainer]}>
        {distance > 0 && <Image style={styles.image} source={carlinhosJpg} />}
        {distance > 0 && (
          <Text style={styles.text}>
            Carlinhos está a <Text style={styles.bold}>{distance} metros</Text>{" "}
            de distância até você.
          </Text>
        )}
        {distance <= 0 && <Text style={styles.text}>Não olhe para trás.</Text>}
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
  redContainer: {
    backgroundColor: "red",
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
