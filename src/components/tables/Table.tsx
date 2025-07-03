import React, { useEffect } from "react";
import { IoTimeOutline } from "react-icons/io5";
import PlayButton from "../Buttons/PlayButton";
import { formatDate, formatTime } from "../../utils/formats";

// Models
import type { Track } from "../../models/Track";

type props = {
  type: "artist" | "album" | "playlist" | "tracks";
  tracks: Track[];
};



const Table = ({ type, tracks }:props) => {

  return (
    <table className="table-auto w-full text-left rtl:text-right">
      {type !== "artist" && (
        <thead className="text-left p-2">
          <tr className="border-b border-gray-800">
            <th scope="col" className="px-6 py-3 w-5">
              #
            </th>
            <th scope="col" className="px-6 py-3 ">
              Title
            </th>
            {(type === "playlist" || type === "tracks") && (
              <th scope="col" className="px-6 py-3">
                Album
              </th>
            )}
            {type === "playlist" && (
              <th scope="col" className="px-6 py-3">
                Date added
              </th>
            )}
            {type === "album" && (
              <th scope="col" className="px-6 py-3">
                Plays
              </th>
            )}
            <th scope="col" className="px-6 py-3 w-10">
              <IoTimeOutline className="text-xl font-bold" />
            </th>
          </tr>
        </thead>
      )}

      <tbody>
        {tracks.map((item, index) => (
          <tr className="group hover:bg-gray-800 transition duration-150 cursor-pointer">
            <td scope="row" className="relative px-6 py-2">
              {index + 1}
              <PlayButton
                uri={item.uri}
                isArtist={type === "artist" ? true : false}
                variant="onImage"
                styles="group-hover:bg-gray-800"
                playMode={type === "tracks" ? "single" : "context"}
                offsetPosition={type === "tracks" ? 0 : index}
              />
            </td>
            <td scope="row" className="flex gap-2 items-center px-6 py-2">
              {type !== "album" && (
                <img
                  src={item.image}
                  className="w-10 h-10"
                  alt={"no image found"}
                />
              )}
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="opacity-75 text-sm">{item.artists}</p>
              </div>
            </td>

            {(type === "album" || type === "artist") && (
              <td scope="row" className="px-6 py-2">
                {item.plays}
              </td>
            )}

            {(type === "playlist" || type === "tracks") && (
              <td scope="row" className="px-6 py-2">
                {item.albumName}
              </td>
            )}

            {type === "playlist" && (
              <td scope="row" className="px-6 py-2">
                {formatDate(item.addedAt)}
              </td>
            )}

            <td scope="row" className="px-6 py-2">
              {formatTime(item.duration)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
