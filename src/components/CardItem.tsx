import PlayButton from "@components/buttons/PlayButton";
import { Link } from "react-router-dom";
import type { PlayButtonProps } from "@shared/types/buttonTypes";
import { buttonPlayVariants } from "@shared/styles/buttonStyles";
import { PlayModes } from "@shared/types/common";

type Props = {
  data: {
    id: string;
    uri: string;
    image: string;
    title: string;
    subtitle: string;
    type: string;
  };
  path?: string;
  playMode?: "single" | "context";
};

const CardItem: React.FC<Props> = ({ data, path, playMode }) => {
  const { id, uri, image, title, subtitle, type } = data;

  const button: PlayButtonProps = {
    buttonStyle: `${buttonPlayVariants.HiddenFilledGreen} bottom-2 right-2`,
    settings: {
      uri: uri,
      offSetPosition: 0,
      playMode: PlayModes.Context, //
      mediaItem: type,
      progress: 0,
      isPlaying: true,
    },
  };
  return (
    <li
      key={id}
      className="group w-1/5 flex flex-col gap-y-2 p-3 rounded-lg hover:bg-gray-900 transition duration-150 cursor-pointer"
    >
      <Link to={`/home/${path}/${id}`}>
        <div className="relative">
          <img
            className={`w-48 h-48 object-cover ${
              type === "artist" ? "rounded-full" : "rounded-lg"
            } drop-shadow-xl `}
            src={image}
            alt={title}
          />
          {playMode && <PlayButton {...button} />}
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-sm opacity-70">{subtitle}</p>
        </div>
      </Link>
    </li>
  );
};

export default CardItem;
