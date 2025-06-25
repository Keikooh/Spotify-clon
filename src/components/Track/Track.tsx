import { useEffect } from "react";
import { fetchDevices, playTrack } from "../../services/SpotifyServices";

import { formatTime } from "../../utils/formats";

// icons
import { SlOptions } from "react-icons/sl";
import PlayButton from "../Buttons/PlayButton";

const Track = ({ data }) => {
  const { album, artists, name, uri, duration_ms } = data;

  const image = album.images[0].url;
  const artist = artists.map((artist) => artist.name).join(", ");
  const duration = duration_ms;

  const track = {
    image,
    artist,
    name,
    duration,
    progress: 0,
    isPlaying: true
  }
  
  return (
    <li className="flex justify-between items-center rounded-lg p-2 hover:bg-gray-900 transition duration-150">
      <div className=" flex gap-2 w-full">
        <div className="relative group">
          <img
            className="w-12 h-12 rounded-lg group-hover:brightness-50"
            src={image}
            alt={name}
          />
          <PlayButton
            uri={uri}
            isArtist={false}
            playMode="single"
            variant="onImage"
            track={track}
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-semibold text-sm">{name}</p>
          <p className="opacity-70 text-sm">{artist}</p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <span className="opacity-70">{formatTime(duration)}</span>
        <SlOptions className="mx-2" />
      </div>
    </li>
  );
};

export default Track;
