import React, { useState } from "react";
import { usePlayerStore } from "../../app/store";
import ControlButton from "./ControlButton";
import { LuRepeat } from "react-icons/lu";
import { getAvailableDevices, setRepeatMode } from "../../services/playerServices";
import { LuRepeat1 } from "react-icons/lu";

const RepeatButton = () => {
  const playerState = usePlayerStore((state) => state.player);
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  const { repeatMode } = playerState;

  const rotateRepeatMode = (currentMode: "context" | "track" | "off") => {
    if (currentMode === "off") return "context";
    if (currentMode === "context") return "track";
    return "off";
  };

  const handleRepeat = async () => {
    const newRepeatMode = rotateRepeatMode(repeatMode);
    setPlayer({ repeatMode: newRepeatMode });

    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      await setRepeatMode(deviceId, newRepeatMode);
    }
  };
  return (
    <ControlButton
      message="Repeat"
      isEnabled={true}
      icon={ repeatMode === "track" ? LuRepeat1: LuRepeat}
      handleClick={handleRepeat}
      mode={repeatMode}
      size="size-2"
      styles={`${repeatMode !== "off" && "text-green-300 relative"}`}
    >
      {repeatMode !== "off" && (
        <div className="absolute -bottom-1 left-1/3 size-1 rounded-full bg-green-300"></div>
      )}
    </ControlButton>
  );
};

export default RepeatButton;
