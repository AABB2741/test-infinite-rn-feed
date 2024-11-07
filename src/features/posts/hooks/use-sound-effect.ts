import {
  Audio,
  type AVPlaybackSource,
  type AVPlaybackStatusToSet,
} from "expo-av";
import type { SoundObject } from "expo-av/build/Audio";
import { useEffect, useState } from "react";

export function useSoundEffect(
  source: AVPlaybackSource,
  initialStatus?: AVPlaybackStatusToSet,
) {
  const [soundObj, setSoundObj] = useState<SoundObject | null>(null);

  useEffect(() => {
    console.log("use effect", source);

    Audio.Sound.createAsync(source, initialStatus)
      .then(setSoundObj)
      .catch(console.error);

    return () => {
      if (soundObj?.status.isLoaded) {
        console.log("parando audio");
        soundObj?.sound
          .stopAsync()
          .then(() => {
            console.log("Áudio parado");
            soundObj?.sound
              .unloadAsync()
              .then(() => {
                console.log("Áudio descarregado");
              })
              .catch((err) =>
                console.error("Não foi possível descarregar o áudio", err),
              );
          })
          .catch((err) => console.error("Não foi possível parar o áudio", err));
      }
    };
  }, [source, initialStatus]);

  return soundObj;
}
