import { fetchDevices, playTrack } from "../../services/SpotifyServices";
import { usePlayer } from "../../hooks/usePlayer";

// icons
import { FaPlay } from "react-icons/fa";

type Props = {
  playMode: "single" | "context";
  isArtist: boolean;
  variant: "floating" | "onImage" | "row";
  uri: string;
  styles?: string;
  track?: {
    image: string;
    artist: string;
    name: string;
    duration: number;
    progress?: number;
    isPlaying?: boolean;
  };
  offsetPosition?:number
};

const variantClasses = {
  floating:
    "text-gray-950 bg-green-500 p-3 rounded-full hover:bg-green-300 hover:scale-110 shadow-xl",
  onImage: "hidden absolute w-full inset-0 group-hover:flex text-white",
  row: "",
};
const PlayButton: React.FC<Props> = ({
  playMode,
  isArtist,
  variant,
  styles,
  uri,
  track,
  offsetPosition
}) => {
  const play = usePlayer();
 
  return (
    <button
      onClick={() => {
        play({ uri, playMode, isArtist, track, offsetPosition})
        // console.log(track)
      }}
      className={`${styles}  ${variantClasses[variant]} items-center justify-center transition duration-150 ease-in-out cursor-pointer `}
    >
      <FaPlay />
    </button>
  );
};

export default PlayButton;
