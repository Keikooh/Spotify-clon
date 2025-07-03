import React, { Component, useEffect, useState } from "react";
import DurationBar from "../DurationBar";
// React Icons

import { IoMdPlay, IoIosPause } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { TbMicrophone2, TbArrowsShuffle } from "react-icons/tb";
import { MdVolumeUp, MdAddCircleOutline } from "react-icons/md";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { LuRepeat } from "react-icons/lu";
import { usePlayerStore } from "../../app/store";

import {
  fetchDevices,
  fetchPlayState,
  getRecentlyPlayedTracks,
  setPlaybackVolume,
  goTo,
  setShuffleState,
  setRepeatMode,
} from "../../services/SpotifyServices";
import ControlButton from "../Buttons/ControlButton";
import ShuffleButton from "../Buttons/ShuffleButton";
import RepeatButton from "../Buttons/RepeatButton";

export const PlayerBar = () => {
  const accessToken = localStorage.getItem("access_token");
  // Store
  const playerState = usePlayerStore((state) => state.player);
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  const {
    track: { name, artists, image },
    isPlaying,
    playMode,
    repeatMode
  } = playerState;

  // Handles

  const changeRepeatMode = () => {
    
    if(repeatMode === "track") {
      return "context"
    }else return repeatMode
  }
  const handleClick = () => {};
  const handleNext = async () => {

    setPlayer({repeatMode: changeRepeatMode()});
    console.warn(repeatMode);

    const devices = await fetchDevices(accessToken);

    if (devices) {
      const deviceId = devices.devices[0].id;
      await goTo(accessToken, deviceId, "next");
    }
  };

  const handlePrevious = async () => {
    setPlayer({repeatMode: changeRepeatMode()});
    
    const devices = await fetchDevices(accessToken);

    if (devices) {
      const deviceId = devices.devices[0].id;
      await goTo(accessToken, deviceId, "previous");
    }
  };

  useEffect(() => {
    const getPlayState = async () => {
      const data = await fetchPlayState(accessToken);

      if (data) {
        const isPlaying = data.is_playing;

        const name = data.item.name;
        const image = data.item.album.images[0].url;
        const duration = data.item.duration_ms;
        const progress = data.progress_ms;
        const artists = data.item.artists
          .map((artist) => artist.name)
          .join(", ");

        const shuffleIsActive = data.shuffle_state;
        const repeatMode = data.repeat_state;
    
          setPlayer({
            track: {
              name,
              artists,
              image,
              duration,
              progress,
            },
            isPlaying,
            playMode: "single",
            shuffleIsActive,
            repeatMode
          });
        
      }
    };

    getPlayState();
  }, []);

  const handleChange = async (event) => {
    const volumePercent = event.target.value;
    const devices = await fetchDevices(accessToken);

    if (devices) {
      const deviceId = devices.devices[0].id;
      await setPlaybackVolume(accessToken, volumePercent, deviceId);
    }
  };

  return (
    <footer className="h-20 flex w-full gap-3 bg-black text-gray-50 p-3">
      <div className="flex w-1/3 items-center gap-4 tracking-tight">
        <img className="w-15 h-15 rounded-lg" src={image} alt={name} />
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <span className="opacity-70 text-sm">{artists}</span>
        </div>

        <MdAddCircleOutline />
      </div>
      <div className="flex flex-col w-1/3 bg-reed-300">
        {/* Controls */}
        <div className="flex w-full justify-center items-center gap-4">
          {/* Shuffle */}
          <ShuffleButton />
          {/* Play previous */}
          <ControlButton
            message="Previous"
            isEnabled={playMode === "single" ? false : true}
            icon={BiSkipPrevious}
            handleClick={handlePrevious}
          />
          <div
            className="rounded-full bg-white p-2 text-black"
            onClick={handleClick}
          >
            {isPlaying ? <IoIosPause /> : <IoMdPlay />}
          </div>
          {/* Play next */}
          <ControlButton
            message="Next"
            isEnabled={playMode === "single" ? false : true}
            icon={BiSkipNext}
            handleClick={handleNext}
          />

          {/* Repeat */}
          <RepeatButton />
        </div>
        <DurationBar />
      </div>
      <div className="flex w-1/3 justify-end gap-2 items-center text-xl">
        <FaRegHeart />
        <TbMicrophone2 />
        <div className="flex  gap-2 items-center cursor-pointer">
          <MdVolumeUp />
          <input
            type="range"
            className="w-1/2"
            min="0"
            max="100"
            onMouseUp={handleChange}
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayerBar;
