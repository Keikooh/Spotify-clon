import { useEffect } from "react";
import ToggleButton from "@components/buttons/ToggleButton";
import { usePlayerStore } from "../../../store/PlayerStore";
import { TbArrowsShuffle } from "react-icons/tb";
import {
  getAvailableDevices,
  togglePlaybackShuffle,
} from "../../../services/playerServices";

const ShuffleButton = () => {
  // Store
  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const { shuffleIsActive, playMode } = usePlayerStore((state) => state.player);

  const shuffleState = shuffleIsActive;
  const isEnabled = playMode === "single" ? false : true;

  // Handles
  const handleClick = async () => {
    const newShuffleState = !shuffleState;
    setPlayer({ shuffleIsActive: newShuffleState });
    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      await togglePlaybackShuffle(deviceId, newShuffleState);
    }
  };

  const button = {
    callback: handleClick,
    icon: TbArrowsShuffle,
    title: "Shuffle",
    isEnabled,
    isActive: shuffleState && isEnabled,
  };
  return <ToggleButton {...button} />;
};

export default ShuffleButton;
