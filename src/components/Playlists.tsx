import PlayButton from "./buttons/PlayButton";
import { MediaItems, PlayModes } from "@shared/types/common";
import { buttonPlayVariants } from "@shared/styles/buttonStyles";
import { getCoverImage } from "@utils/images";
import { Link } from "react-router-dom";

const Playlists = ({ playlists, displayMode }) => {
  const styles =
    displayMode === "list"
      ? "scroll overflow-y-auto"
      : "grid grid-cols-4 gap-4";

  return (
    <ul className={`${styles}`}>
      {playlists.map(({ id, images, name, owner, uri }) => {
        return (
          <li key={id}>
            <Link
              to={`/home/playlist/${id}`}
              className="p-2 rounded-sm relative group flex gap-x-2 hover:bg-gray-800 transition duration-150 cursor-pointer"
            >
              <div className="relative size-14">
                <img
                  src={getCoverImage(images)}
                  alt="not-found"
                  className={`size-full rounded-sm ${
                    displayMode === "list" && "group-hover:brightness-40"
                  }`}
                />
                {displayMode === "list" && (
                  <PlayButton
                    buttonStyle={buttonPlayVariants.HiddenTransparent}
                    settings={{
                      uri: uri,
                      offSetPosition: 0,
                      playMode: PlayModes.Context,
                      mediaItem: MediaItems.Playlist,
                      progress: 0,
                      isPlaying: true,
                    }}
                  />
                )}
              </div>

              <div className="flex flex-col justify-center">
                <p className="font-semibold">{name}</p>
                {displayMode === "list" && (
                  <p className="opacity-50 text-sm">{owner.display_name}</p>
                )}
              </div>

              {displayMode === "grid" && (
                <PlayButton
                  buttonStyle={buttonPlayVariants.HiddenFilledGreen}
                  settings={{
                    uri: uri,
                    offSetPosition: 0,
                    playMode: PlayModes.Context,
                    mediaItem: MediaItems.Playlist,
                    progress: 0,
                    isPlaying: true,
                  }}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Playlists;
