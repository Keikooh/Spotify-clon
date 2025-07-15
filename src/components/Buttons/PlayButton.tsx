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
  onImage: "hidden absolute group-hover:flex text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
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
      }}
      className={`${styles}  ${variantClasses[variant]} items-center justify-center transition duration-150 ease-in-out cursor-pointer `}
    >
      <FaPlay />
    </button>
  );
};

export default PlayButton;
