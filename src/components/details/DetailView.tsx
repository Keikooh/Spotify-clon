import React from "react";
import Table from "../tables/Table";
import { LuPen } from "react-icons/lu";
import { PiMusicNotesSimple } from "react-icons/pi";
import PlayButton from "../Buttons/PlayButton";
import ShuffleButton from "../Buttons/ShuffleButton";
import DeleteButton from "../Buttons/DeleteButton";

// Models
import type { Track } from "../../models/Track";

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
const DetailView: React.FC<props> = ({
  type,
  uri,
  headerData,
  itemsList,
  isEditable,
}) => {
  const { image, title, subtitle, description } = headerData;

  return (
    <div className="flex flex-col gap-y-4 h-full overflow-y-auto">
      {/* header */}
      {type !== "artist" && (
        <div className="flex gap-4">
          <div className="w-55 h-55 relative group">
            <div className="w-full h-full group-hover:brightness-50 transition">
              {image.length > 0 ? (
                <img
                  src={image}
                  alt={title}
                  className=" object-cover filter "
                />
              ) : (
                <div className="w-full h-full bg-gray-900 flex justify-center items-center ">
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
          <div className="flex flex-col justify-center gap-2">
            <span className="font-semibold">{subtitle}</span>
            <h2 className="text-8xl font-bold">{title}</h2>
            <p className="font-semibold">{description}</p>
          </div>
        </div>
      )}

      {type === "artist" && (
        <div className="relative w-full h-80">
          <img src={image} className="object-cover w-full h-80 brightness-50" />
          <div className="absolute inset-0 flex flex-col justify-center gap-2 px-5">
            <span className="font-semibold">{subtitle}</span>
            <h2 className="text-8xl font-bold">{title}</h2>
            <p className="font-semibold">{description}</p>
          </div>
        </div>
      )}

      {/* ControlBar */}
      <div className="mx-2 flex gap-2">
        <PlayButton
          uri={uri}
          isArtist={type === "artist" ? true : false}
          variant="floating"
          styles="size-15 flex"
          playMode="context"
        />
        <ShuffleButton size="size-10" />
        {
          isEditable && (<DeleteButton/>)
        }
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
  );
};

export default DetailView;
