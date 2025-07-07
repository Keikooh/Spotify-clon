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

const Table = ({ type, tracks }: props) => {
  return (
    <table className="table-fixed w-full text-left rtl:text-right">
      {type !== "artist" && (
        <thead className="text-left p-2">
          <tr className="border-b border-gray-800 w-full">
            <th scope="col" className="px-6 py-3 w-5 w-10">
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
            <th scope="col" className="px-6 py-3 w-20">
              <IoTimeOutline className="text-xl font-bold" />
            </th>
          </tr>
        </thead>
      )}

      <tbody>
        {tracks.map((item, index) => (
          <tr className="w-full group hover:bg-gray-800 transition duration-150 cursor-pointer">
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
            <td scope="row" className="px-6 py-2">
              <div className="flex gap-2 items-center min-w-0">
                {type !== "album" && (
                  <img
                    src={item.image}
                    className="w-10 h-10 shrink-0 rounded-sm"
                    alt="no image found"
                  />
                )}
                <div className="flex flex-col min-w-0">
                  <p className="font-semibold truncate">{item.name}</p>
                  <p className="opacity-75 text-sm truncate">{item.artists}</p>
                </div>
              </div>
            </td>

            {(type === "playlist" || type === "tracks") && (
              <td scope="row" className="px-6 py-2 w-[250px] truncate">
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
