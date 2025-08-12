import { usePlayerbackStore } from "../store/PlayerbackStore";
import {
  getAvailableDevices,
  getPlaybackState,
  playTrack,
} from "../services/playerServices";

import {
  type Playerback,
  type PlaySettings,
} from "../shared/types/common";
import { getCoverImage } from "@utils/images";

export const usePlayer = () => {
  const setPlayerback = usePlayerbackStore((state) => state.setPlayerback);

  const play = async (settings: PlaySettings) => {
    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      // Play song on Spotify
      await playTrack(deviceId, settings);

      // Get data from Spotify and set it in the store
      setTimeout(async () => {
        const data = await getPlaybackState();

        const playerbackState: Playerback = {
          track: {
            name: data.item.name,
            artists: data.item.artists.map((artist) => artist.name).join(", "),
            image: getCoverImage(data.item.album.images),
            duration: data.item.duration_ms,
          },
          settings: {
            progress: data.progress_ms,
            isPlaying: data.is_playing,
            volume: data.device.volume_percent,
            shuffleMode: data.shuffle_state,
            repeatMode: data.repeat_state,
            actions: {
              toggling_repeat_context: data.actions.disallows.toggling_repeat_context,
              toggling_repeat_track: data.actions.disallows.toggling_repeat_track,
              toggling_shuffle: data.actions.disallows.toggling_shuffle,
            },
          },
        };

        setPlayerback(playerbackState);
      }, 700); // Because of the Spotify Player delay
    }
  };

  return play;
};
