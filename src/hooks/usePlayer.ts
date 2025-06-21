import { useTrackStore } from "../app/store";
import { fetchDevices, playTrack } from "../services/SpotifyServices";

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
  const setTrack = useTrackStore((state) => state.setTrack);

  const getFirstTrackFromContext = () => {};

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
        const { name, artist, image, duration, progress, isPlaying } = track;
        setTrack({
          name,
          artist,
          image,
          duration,
          progress,
          isPlaying,
        });
      }else{ //si no viene el track quiere decir que es un album o una paylist y se tiene que obtener la cancion actual

      }
    }
  };

  return play;
};
