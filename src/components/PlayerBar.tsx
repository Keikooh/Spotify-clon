import React, { Component, useEffect, useState } from "react";
import DurationBar from "@components/DurationBar";
// React Icons

import { IoMdPlay, IoIosPause } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { TbMicrophone2 } from "react-icons/tb";
import { MdVolumeUp, MdAddCircleOutline } from "react-icons/md";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { usePlayerStore } from "../store/PlayerStore";

import {
  getAvailableDevices,
  getPlaybackState,
  setPlaybackVolume,
  skipTo,
} from "@services/playerServices";
import ShuffleButton from "@components/buttons/controlButtons/ShuffleButton";
import RepeatButton from "@components/buttons/controlButtons/RepeatButton";
import Button from "@components/buttons/Button";
import type { ButtonProps } from "@shared/types/buttonTypes";
import { buttonVariants } from "@shared/styles/buttonStyles";
import ResumeButton from "@components/buttons/controlButtons/ResumeButton";

export const PlayerBar = () => {
  // Store
  const playerState = usePlayerStore((state) => state.player);
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  const {
    track: { name, artists, image },
    isPlaying,
    playMode,
    repeatMode,
  } = playerState;

  // Handles

  const changeRepeatMode = () => {
    if (repeatMode === "track") {
      return "context";
    } else return repeatMode;
  };

  const handleNext = async () => {
    setPlayer({ repeatMode: changeRepeatMode() });
    console.warn(repeatMode);

    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      await skipTo(deviceId, "next");
    }
  };

  const handlePrevious = async () => {
    console.log("Go to previous track");
    setPlayer({ repeatMode: changeRepeatMode() });

    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      await skipTo(deviceId, "previous");
    }
  };

  useEffect(() => {
    const getPlayState = async () => {
      const data = await getPlaybackState();

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
          repeatMode,
        });
      }
    };

    getPlayState();
  }, []);

  const handleChange = async (event) => {
    const volumePercent = event.target.value;
    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      await setPlaybackVolume(volumePercent, deviceId);
    }
  };

  const isContext = playMode === "single" ? false : true;
  // Buttons
  const toPreviousButton: ButtonProps = {
    callback: handlePrevious,
    icon: BiSkipPrevious,
    title: "Previous",
    buttonStyle: buttonVariants.transparent,
    isEnabled: isContext,
  };
  const toNextButton: ButtonProps = {
    callback: handleNext,
    icon: BiSkipNext,
    title: "Next",
    buttonStyle: buttonVariants.transparent,
    isEnabled: isContext,
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
      <div className="flex flex-col w-1/3">
        {/* Controls */}
        <div className="flex w-full gap-x-3 justify-center items-center h-10">
          {/* Activate shuffle mode*/}
          <ShuffleButton />
          {/* Play previous song*/}
          <Button {...toPreviousButton} />
          <ResumeButton />
          {/* Play next song*/}
          <Button {...toNextButton} />
          {/*Switch repeat mode*/}
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
