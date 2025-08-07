import { useNavigate } from "react-router-dom";
import PlayButton from "@components/buttons/PlayButton";
import { PiMusicNotesSimple } from "react-icons/pi";
import type { PlayButtonProps } from "@shared/types/buttonTypes";
import { MediaItems, PlayModes } from "@shared/types/common";
import { buttonPlayVariants } from "@shared/styles/buttonStyles";

const Playlist = ({ data, style }) => {
  const { name, images, owner, id, uri } = data;

  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/home/playlist/${id}`);
  };

  const variantClasses = {
    vertical: "w-full hover:bg-gray-900",
    horizontal: "bg-gray-900 hover:bg-gray-700 rounded-lg",
  };

  const isHorizontal = style === "horizontal" ? true : false;

  const buttonStyle = isHorizontal
    ? `${buttonPlayVariants.HiddenFilledGreen} bottom-1/5 right-2`
    : buttonPlayVariants.HiddenTransparent;

  const button: PlayButtonProps = {
    buttonStyle,
    settings: {
      uri: uri,
      offSetPosition: 0,
      playMode: PlayModes.Context, //
      mediaItem: MediaItems.Playlist,
      progress: 0,
      isPlaying: true,
    },
  };
  return (
    <li
      className={`${variantClasses[style]} ${
        isHorizontal && "relative group"
      } flex gap-2 p-2 cursor-pointer transition duration-150 `}
      onClick={() => handleClick(id)}
    >
      <div className="relative group">
        <div
          className={`${
            !isHorizontal && ""
          } size-14 rounded-sm group-hover:brightness-50`}
        >
          {images ? (
            <img
              className="w-full h-full rounded-sm"
              src={images[0]?.url}
              alt={name}
            />
          ) : (
            <div className="bg-gray-700 w-full h-full flex justify-center items-center rounded-sm">
              <PiMusicNotesSimple className="size-5" />
            </div>
          )}
        </div>

        {style === "vertical" && <PlayButton {...button} />}
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-semibold">{name}</p>
        {!isHorizontal && (
          <p className="opacity-50 text-sm">{owner.display_name}</p>
        )}
      </div>

      {isHorizontal && <PlayButton {...button} />}
    </li>
  );
};

export default Playlist;
