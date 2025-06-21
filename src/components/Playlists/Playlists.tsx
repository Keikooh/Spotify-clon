import { useEffect } from "react";
import Playlist from "./Playlist/Playlist";

const Playlists = ({ list }) => {
  return (
    <ul className="h-full overflow-y-auto">
      {list.map((playlist) => (
        <Playlist key={playlist.id} data={playlist} />
      ))}
    </ul>
  );
};

export default Playlists;
