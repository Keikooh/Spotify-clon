import { usePlayerStore } from "../store/PlayerStore";
import {
  getAvailableDevices,
  getPlaybackState,
  playTrack,
} from "../services/playerServices";

import type { Track } from "../interfaces/Track";
import type { MediaItem, PlaySettings } from "../shared/types/common";

export const usePlayer = () => {
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  const play = async (settings: PlaySettings) => {
    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      // Play song on Spotify
      await playTrack(deviceId, settings);

      // Get data from Spotify and set it in the store
      setTimeout(async () => {
        const data = await getPlaybackState();

        const currentPlayer = {
          track: {
            name: data.item.name,
            artists: data.item.artists.map((artist) => artist.name).join(", "),
            image: data.item.album.images[0].url,
            duration: data.item.duration_ms,
            progress: data.progress_ms,
          },
          isPlaying: data.is_playing,
          playMode,
        };

        setPlayer(currentPlayer);
      }, 700); // Because of the Spotify Player delay
    }
  };

  return play;
};
