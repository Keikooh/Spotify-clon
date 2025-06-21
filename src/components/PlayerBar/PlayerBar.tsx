import React, { Component, useEffect } from "react";
import DurationBar from "../DurationBar";
// React Icons

import { IoMdPlay } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { TbMicrophone2 } from "react-icons/tb";
import { MdVolumeUp } from "react-icons/md";
import { BiSkipNext } from "react-icons/bi";
import { BiSkipPrevious } from "react-icons/bi";
import { LuRepeat } from "react-icons/lu";
import { TbArrowsShuffle } from "react-icons/tb";
import { useTrackStore } from "../../app/store";
import { IoIosPause } from "react-icons/io";

import { fetchPlayState, getRecentlyPlayedTracks } from "../../services/SpotifyServices";

export const PlayerBar = () => {
  const accessToken = localStorage.getItem("access_token");
  const setTrack = useTrackStore((state) => state.setTrack);

  useEffect(() => {
    // const fetchRecentlyPlayedTracks = async (accessToken: string | null) => {
    //   const data = await getRecentlyPlayedTracks(accessToken);
    //   console.log(data)
    // };

    const getPlayState = async () => {
      const data = await fetchPlayState(accessToken);

      if (data) {
        const isPlaying = data.is_playing;

        if (isPlaying) {
          const name = data.item.name;
          const image = data.item.album.images[0].url;
          const duration = data.item.duration_ms;
          const progress = data.progress_ms;
          const artist = data.item.artists
            .map((artist) => artist.name)
            .join(", ");

          console.log({ name, artist, image, duration, progress, isPlaying });
          setTrack({ name, artist, image, duration, progress, isPlaying });
        } else {
          // const recentlyPlayed = await fetchRecentlyPlayedTracks(accessToken);

          // if(recentlyPlayed){
          //   console.log(recentlyPlayed)
          // }
        }
      }
    };

    getPlayState();
  }, []);

  const handleClick = () => {};

  const currentTrack = useTrackStore((state) => state.track);

  const { name, artist, image, duration, progress, isPlaying } = currentTrack;

  return (
    <footer className="h-20 flex w-full bg-black text-gray-50 p-3">
      <div className="flex w-1/3 items-center gap-4 tracking-tight">
        <img className="w-15 h-15 rounded-lg" src={image} alt={name} />
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <span className="opacity-70 text-sm">{artist}</span>
        </div>
      </div>
      <div className="flex flex-col w-1/3">
        {/* Controls */}
        <div className="flex w-full justify-center items-center gap-4">
          <LuRepeat className="text-xl" />
          <BiSkipPrevious className="text-4xl" />
          <div className="rounded-full bg-white p-2 text-black" onClick={handleClick}>
            {
              isPlaying ? (<IoIosPause/>): (<IoMdPlay/>)
            }
          </div>
          <BiSkipNext className="text-4xl" />
          <TbArrowsShuffle className="text-xl" />
        </div>
        <DurationBar data={{ duration, progress, isPlaying }} />
      </div>
      <div className="flex w-1/3 justify-end gap-2 items-center text-xl">
        <FaRegHeart />
        <TbMicrophone2 />
        <div className="flex gap-2">
          <MdVolumeUp />
          <></>
        </div>
      </div>
    </footer>
  );
};

export default PlayerBar;
