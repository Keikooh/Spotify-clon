import { usePlayerStore } from "../app/store";
import {
  getAvailableDevices,
  getPlaybackState,
  playTrack,
} from "../services/playerServices"

import type { Track } from "../interfaces/Track";


type props = {
  uri: string;
  playMode: "single" | "context";
  isArtist: boolean;
  track?: Track
  offsetPosition?: number;
};

export const usePlayer = () => {
  const accessToken = localStorage.getItem("access_token");
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  const play = async ({
    uri,
    playMode,
    isArtist,
    track,
    offsetPosition,
  }: props) => {
    const result = await getAvailableDevices(accessToken);

    if (result) {
      const deviceId = result.devices[0].id;
      await playTrack(
        accessToken, 
        uri,
        deviceId,
        playMode,
        isArtist,
        offsetPosition
      );

      if (track) {

        
        const {
          name,
          artists,
          image,
          duration,
          progress,
          isPlaying
        } = track;
        
        setPlayer({
          track: {
            name,
            artists,
            image,
            duration,
            progress,
          },
          isPlaying,
          playMode,
        });
      } else {
        setTimeout(async () => {
          const data = await getPlaybackState(accessToken);

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
        }, 600); // Because of the Spotify Player delay
      }
    }
  };

  return play;
};
