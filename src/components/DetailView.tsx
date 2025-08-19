import { useState } from "react";
import { LuPen } from "react-icons/lu";
import { getCoverImageDominantColor } from "../utils/images";
import { useModal } from "../hooks/useModal";
// Types
import { MediaItems, PlayModes, type MediaItem } from "@shared/types/common";
// Components
import Table from "./tables/Table";
import Button from "./buttons/Button";
import PlayButton from "@components/buttons/PlayButton";
import RepeatButton from "@components/buttons/controlButtons/RepeatButton";
import ModalEditPlaylistDetails from "./modals/ModalEditPlaylistDetails";
// Styles
import type { ButtonProps, PlayButtonProps } from "@shared/types/buttonTypes";
import {
  buttonPlayVariants,
  buttonVariants,
} from "@shared/styles/buttonStyles";

type DetailViewProps = {
  type: MediaItem;
  uri: string;
  headerData: {
    image: string;
    title: string;
    subtitle: string;
    description?: string | null;
  };
  itemsList: Track[];
  isEditable?: boolean;
  onUpdated?: () => void;
};
const DetailView = ({
  type,
  uri,
  headerData,
  itemsList,
  isEditable,
  onUpdated,
}: DetailViewProps) => {
  const [dominantColor, setDominantColor] = useState<number[]>([]);
  const { image, title, subtitle, description } = headerData;

  const playButton: PlayButtonProps = {
    buttonStyle: buttonPlayVariants.filledGreen,
    settings: {
      uri: uri,
      offSetPosition: 0,
      playMode: PlayModes.Context, //
      mediaItem: type,
      progress: 0,
      isPlaying: true,
    },
  };

  const getDominantColor = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const image = e.currentTarget;
    const dominantColor = getCoverImageDominantColor(image);
    setDominantColor(dominantColor);
  };

  const modal = useModal();

  const openModalButton: ButtonProps = {
    callback: () => {
      modal.open();
    },
    icon: LuPen,
    title: "",
    buttonStyle: buttonVariants.transparent,
    isEnabled: true,
  };

  return (
    <div
      className="rounded-xl flex flex-col gap-y-4 h-full scroll overflow-y-auto"
      style={{
        background: `linear-gradient(180deg, rgb(${dominantColor.join(
          ","
        )},0.6) , transparent)`,
      }}
    >
      {isEditable && onUpdated && (
        <ModalEditPlaylistDetails
          {...modal}
          callback={onUpdated}
          playlist={{ title, description, image }}
        />
      )}

      {/* banner */}
      <div className="p-3 flex gap-4 items-end">
        <div className="w-55 h-55 relative group">
          <div
            className={`w-full h-full ${
              isEditable && "group-hover:brightness-50"
            } transition`}
          >
            <img
              src={image}
              alt={title}
              crossOrigin="anonymous"
              onLoad={getDominantColor}
              className="w-full h-full object-cover filter shadox-xl rounded-sm"
            />
          </div>

          {type === MediaItems.Playlist && isEditable === true && (
            <div className="hidden absolute inset-0 group-hover:flex flex-col  items-center  gap-y-2 justify-center font-semibold">
              <Button {...openModalButton} />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center gap-y-2">
          <span className="font-semibold">{"Public playlist"}</span>
          <h2
            className={`font-bold ${
              title.length > 15 ? "text-6xl" : "text-8xl"
            }`}
          >
            {title}
          </h2>
          {description && (
            <p className="font-semibold text-white/60 text-xs">{description}</p>
          )}
          <span className="font-semibold">{subtitle}</span>
        </div>
      </div>

      <div className="bg-black/40 p-4">
        {/* Control bar */}
        <div className="mx-2 my-10 flex gap-5">
          <PlayButton {...playButton} />
          <RepeatButton />
        </div>

        {type === MediaItems.Artist && (
          <h4 className="font-bold text-2xl">Popular</h4>
        )}

        {/* Songs */}
        {itemsList.length > 0 ? (
          <Table type={type} tracks={itemsList} />
        ) : (
          <p className="text-center text-2xl opacity-70 font-semibold">
            Add some music to your new playlist
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailView;
