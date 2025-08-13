import Table from "./tables/Table";
import { LuPen } from "react-icons/lu";
import { PiMusicNotesSimple } from "react-icons/pi";
import PlayButton from "@components/buttons/PlayButton";
import DeleteButton from "@components/buttons/controlButtons/RepeatButton";
// Models

import type { PlayButtonProps } from "@shared/types/buttonTypes";
import { PlayModes } from "@shared/types/common";
import { buttonPlayVariants } from "@shared/styles/buttonStyles";
import { getCoverImageDominantColor } from "../utils/images";
import { useState } from "react";

type props = {
  type: "album" | "playlist" | "artist";
  uri: string;
  headerData: {
    image: string;
    title: string;
    subtitle: string;
    description: string;
  };
  itemsList: Track[];
  isEditable?: boolean;
};
const DetailView = ({
  type,
  uri,
  headerData,
  itemsList,
  isEditable,
}: props) => {
  const [dominantColor, setDominantColor] = useState<number[]>([]);
  const { image, title, subtitle, description } = headerData;

  const button: PlayButtonProps = {
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

  return (
    <div
      className="rounded-xl flex flex-col gap-y-4 h-full scroll overflow-y-auto"
      style={{
        background: `linear-gradient(180deg, rgb(${dominantColor.join(
          ","
        )}) , transparent)`,
      }}
    >
      {/* header */}
      {type !== "artist" && (
        <div className="p-3 flex gap-4 items-end">
          <div className="w-55 h-55 relative group">
            <div className="w-full h-full group-hover:brightness-50 transition">
              {image.length > 0 ? (
                <img
                  src={image}
                  alt={title}
                  crossOrigin="anonymous"
                  onLoad={getDominantColor}
                  className="w-full h-full object-cover filter shadox-xl rounded-sm"
                />
              ) : (
                <div className="w-full h-full rounded-sm bg-gray-900 flex justify-center items-center ">
                  <PiMusicNotesSimple className="size-20" />
                </div>
              )}
            </div>

            {type === "playlist" && isEditable === true && (
              <div className="hidden absolute inset-0 group-hover:flex flex-col  items-center  gap-y-2 justify-center font-semibold">
                <LuPen className="text-2xl" />
                <p className="text-xl">Choose photo</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center gap-y-4">
            <span className="font-semibold">{subtitle}</span>
            <h2
              className={`font-bold ${
                title.length > 15 ? "text-7xl" : "text-8xl"
              }`}
            >
              {title}
            </h2>
            <p className="font-semibold">{description}</p>
          </div>
        </div>
      )}

      {type === "artist" && (
        <div className="p-3 relative w-full h-80">
          <img src={image} className="object-cover w-full h-80 brightness-50" />
          <div className="absolute inset-0 flex flex-col justify-center gap-2 px-5">
            <span className="font-semibold">{subtitle}</span>
            <h2 className="text-8xl font-bold">{title}</h2>
            <p className="font-semibold">{description}</p>
          </div>
        </div>
      )}

      <div className="bg-black/40 p-4">
        {/* ControlBar */}
        <div className="mx-2 my-10 flex gap-5">
          <PlayButton {...button} />
          {isEditable && <DeleteButton />}
        </div>

        {type === "artist" && <h4 className="font-bold text-2xl">Popular</h4>}
        {/* Table */}

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
