import React, { Component, useEffect, useState } from "react";
import DurationBar from "@components/DurationBar";
// React Icons

import { IoMdPlay, IoIosPause } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { TbMicrophone2 } from "react-icons/tb";
import { MdVolumeUp, MdAddCircleOutline } from "react-icons/md";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { usePlayerbackStore } from "../store/PlayerbackStore";

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
import { RepeatModes } from "@shared/types/common";
import { getCoverImage } from "@utils/images";

export const PlayerBar = () => {
  // Store
  const playerback = usePlayerbackStore((state) => state.playerback);
  const setPlayerback = usePlayerbackStore((state) => state.setPlayerback);

  const {
    track: { name, artists, image },
    settings: { playMode, volume, repeatMode },
  } = playerback;

  // Handles

  const changeRepeatMode = () => {
    if (repeatMode === RepeatModes.Track) {
      return RepeatModes.Context;
    } else return repeatMode;
  };

  const handleNext = async () => {
    setPlayerback({ settings: { repeatMode: changeRepeatMode() } });

    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      await skipTo(deviceId, "next");
    }
  };

  const handlePrevious = async () => {
    console.log("Go to previous track");
    setPlayerback({ settings: { repeatMode: changeRepeatMode() } });

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
        setPlayerback({
          track: {
            name: data.item.name,
            artists: data.item.artists.map((artist) => artist.name).join(", "),
            image: getCoverImage(data.item.album.images),
            duration: data.item.duration_ms,
          },
          settings: {
            isPlaying: data.is_playing,
            progress: data.progress_ms,
            volume: data.device.volume_percent,
            shuffleMode: data.shuffle_state,
            repeatMode: data.repeat_state,
            actions: {
              toggling_repeat_context: data.actions.disallows.toggling_repeat_context,
              toggling_repeat_track: data.actions.disallows.toggling_repeat_track,
              toggling_shuffle: data.actions.disallows.toggling_shuffle,
            },
          },
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
        <img className="w-15 h-15 rounded-lg" src={image} alt="not-found" />
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
            value={volume}
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
