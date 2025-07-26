import { useEffect } from "react";
import Playlist from "./Playlist/Playlist";

const Playlists = ({ list, style }) => {
  
  const filteredList = style === "horizontal" ? list.slice(0, 8) : list
  const variantClasses = { 
    vertical: "scroll overflow-y-auto",
    horizontal: "grid grid-cols-4 gap-4 "
  }
  return (
    <ul className={`${variantClasses[style]}`}>
      {filteredList.map((playlist) => (
        <Playlist style={style} key={playlist.id} data={playlist} />
      ))}
    </ul>
  );
};

export default Playlists;
