import React, { useEffect, useState } from "react";
import ControlButton from "./ControlButton";
import { usePlayerStore } from "../../app/store";
import { TbArrowsShuffle } from "react-icons/tb";
import { getAvailableDevices , togglePlaybackShuffle } from "../../services/playerServices";

type props = {
    size?:string;
}
const ShuffleButton:React.FC<props> = ( { size }) => {
  // Store

  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const {shuffleIsActive, playMode} = usePlayerStore((state) => state.player);

  // State
  
  const shuffleState = shuffleIsActive;

  const isEnabled = playMode === "single" ? false : true;

  // handles
  const handleShuffle = async () => {
    const newShuffleState = !shuffleState;
    setPlayer({ shuffleIsActive: newShuffleState });
    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      await togglePlaybackShuffle(deviceId, newShuffleState);
    }
  };

  useEffect(() => {
    
  }, [shuffleIsActive])
  
  return (
    <ControlButton
      message="Shuffle"
      isEnabled={isEnabled}
      icon={TbArrowsShuffle}
      handleClick={handleShuffle}
      isActive={shuffleState}
      styles={`${shuffleState && isEnabled && "text-green-300 relative"}`}
      size={`${size ? {size} : "size-2"}`}
    >
      {shuffleState && isEnabled && (
        <div className="absolute -bottom-1 left-1/3 size-1 rounded-full bg-green-300"></div>
      )}
    </ControlButton>
  );
};

export default ShuffleButton;
