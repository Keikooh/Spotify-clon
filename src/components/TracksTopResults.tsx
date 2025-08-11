import { formatTime } from "@utils/formats";
import Button from "./buttons/Button";
import PlayButton from "./buttons/PlayButton";
import { MediaItems, PlayModes } from "@shared/types/common";
import { buttonPlayVariants } from "@shared/styles/buttonStyles";
import { getCoverImage } from "@utils/images";

const TracksTopResults = ({ tracks }) => {
  return (
    <ul>
      {tracks.map(({ uri, name, album, artists, duration_ms}) => {
        return (
          <li className="flex hover:bg-gray-800 p-2 rounded-sm">
            <div className=" flex gap-2 w-full">
              <div className="relative group">
                <img
                  className="w-12 h-12 rounded-sm group-hover:brightness-50"
                  src={getCoverImage(album.images)}
                  alt={name}
                />
                <PlayButton
                  buttonStyle={buttonPlayVariants.HiddenTransparent}
                  settings={{
                    uri: uri,
                    playMode: PlayModes.Single,
                    mediaItem: MediaItems.Track,
                    progress: 0,
                    isPlaying: true,
                    offSetPosition: 0
                  }}
                />
              </div>

              <div className="flex flex-col justify-center">
                <p className="font-semibold text-sm">{name}</p>
                <p className="opacity-70 text-sm">{artists.map( artist => artist.name).join(', ')}</p>
              </div>
            </div>

            <div className="flex gap-2 items-center me-2">
              <span className="opacity-70">{formatTime(duration_ms)}</span>
              {/* <SlOptions className="mx-2" /> */}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TracksTopResults;
