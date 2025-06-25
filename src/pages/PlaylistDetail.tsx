import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPlaylist } from "../services/SpotifyServices";
import { formatTime, formatDate } from "../utils/formats";

// icons
import { IoTimeOutline } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
import { LuPen } from "react-icons/lu";
import PlayButton from '../components/Buttons/PlayButton';
import ShuffleButton from "../components/Buttons/ShuffleButton";

const PlaylistDetail = () => {
  const { id } = useParams();
  const accessToken = localStorage.getItem("access_token");
  const [playlist, setplaylist] = useState(null);

  useEffect(() => {
    const getPlaylist = async (id) => {
      const data = await fetchPlaylist(accessToken, id);

      if (data) {
        setplaylist(data);
        console.log(data);
      }
    };

    getPlaylist(id);
  }, [id, accessToken]);

  if (playlist) {
    return (
      <div className="flex flex-col gap-y-4 h-full overflow-y-auto">
        <div className="flex gap-4">
          <div className="w-55 h-55 relative group">
            <img
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="w-full h-full object-cover filter group-hover:brightness-50 transition"
            />
            <div className="hidden absolute inset-0 group-hover:flex flex-col  items-center  gap-y-2 justify-center font-semibold">
              <LuPen className="text-2xl" />
              <p className="text-xl">Choose photo</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <span>Public playlist</span>
            <h2 className="text-8xl font-bold">{playlist.name}</h2>
            <p>
              {playlist.owner.display_name} {playlist.tracks.items.length}{" "}
              songs, {}
            </p>
          </div>
        </div>

        <div className="mx-2 flex gap-2">
          <PlayButton
            uri={playlist.uri}
            isArtist={false}
            variant="floating"
            styles="size-15 flex"
            playMode="context"
          />
          <ShuffleButton size="size-10"/>
        </div>
        <table className="table-auto w-full text-left rtl:text-right">
          <thead className="text-left p-2">
            <tr className="border-b border-gray-800">
              <th scope="col" className="px-6 py-3 w-5">
                #
              </th>
              <th scope="col" className="px-6 py-3 w-auto">
                Title
              </th>
              <th scope="col" className="px-6 py-3 w-1/4">
                Album
              </th>
              <th scope="col" className="px-6 py-3 w-1/4">
                Date added
              </th>
              <th scope="col" className="px-6 py-3 w-10">
                <IoTimeOutline className="text-xl font-bold" />
              </th>
            </tr>
          </thead>
          <tbody>
            {playlist.tracks.items?.map((item, index) => (
              <tr className="group hover:bg-gray-800 transition duration-150 cursor-pointer">
                <td scope="row" className="relative px-6 py-2">
                  {index}
                  <PlayButton 
                    uri={playlist.uri}
                    isArtist={false}
                    variant="onImage"
                    styles="group-hover:bg-gray-800"
                    playMode="context"
                    // pasar track porque aqui si hay
                    offsetPosition={index}
                  />
                </td>
                <td scope="row" className="flex gap-2 items-center px-6 py-2">
                  <img
                    src={item.track.album.images[0].url}
                    className="w-10 h-10"
                    alt={"no image found"}
                  />{" "}
                  <div>
                    <p className="font-semibold">{item.track.name}</p>
                    <p className="opacity-75 text-sm">
                      {item.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                  </div>{" "}
                </td>
                <td scope="row" className="px-6 py-2">
                  {item.track.album.name}
                </td>
                <td scope="row" className="px-6 py-2">
                  {formatDate(item.added_at)}
                </td>
                <td scope="row" className="px-6 py-2">
                  {formatTime(item.track.duration_ms)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <p>Cargando</p>;
  }
};

export default PlaylistDetail;
