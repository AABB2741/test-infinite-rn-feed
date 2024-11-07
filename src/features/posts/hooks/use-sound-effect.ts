import { Audio, type AVPlaybackSource } from "expo-av";
import { useEffect, useState } from "react";

export function useSoundEffect(source: AVPlaybackSource) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    let _sound: Audio.SoundObject | null = null;
    const loadSound = async () => {
      _sound = await Audio.Sound.createAsync(source);
      setSound(_sound.sound);
    };
    loadSound();

    return () => {
      _sound?.sound?.unloadAsync();
    };
  }, []);

  return sound;
}
