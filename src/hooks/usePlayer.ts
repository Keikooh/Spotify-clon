import { usePlayerStore } from "../app/store";
import {
  fetchDevices,
  fetchPlayState,
  playTrack,
} from "../services/SpotifyServices";

type props = {
  uri: string;
  playMode: "single" | "context";
  isArtist: boolean;
  track?: {
    image: string;
    artist: string;
    name: string;
    duration: number;
    progress?: number;
    isPlaying?: boolean;
  };
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
    const result = await fetchDevices(accessToken);

    if (result) {
      const deviceId = result.devices[0].id;
      await playTrack(
        uri,
        deviceId,
        accessToken,
        playMode,
        isArtist,
        offsetPosition
      );

      if (track) {

        
        const {
          name,
          artist,
          image,
          duration,
          progress,
          isPlaying
        } = track;
        
        setPlayer({
          track: {
            name,
            artist,
            image,
            duration,
            progress,
          },
          isPlaying,
          playMode,
        });
      } else {
        setTimeout(async () => {
          const data = await fetchPlayState(accessToken);

          const currentPlayer = {
            track: {
              name: data.item.name,
              artist: data.item.artists.map((artist) => artist.name).join(", "),
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
