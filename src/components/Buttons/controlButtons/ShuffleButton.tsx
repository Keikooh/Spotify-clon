import { useEffect } from "react";
import ToggleButton from "@components/buttons/ToggleButton";
import { usePlayerbackStore } from "../../../store/PlayerbackStore";
import { TbArrowsShuffle } from "react-icons/tb";
import {
  getAvailableDevices,
  togglePlaybackShuffle,
} from "../../../services/playerServices";

const ShuffleButton = () => {
  // Store
  const setPlayerback = usePlayerbackStore((state) => state.setPlayerback);
  const { settings } = usePlayerbackStore((state) => state.playerback);

  const { shuffleMode, actions } = settings;
  const shuffleState = shuffleMode;
  const isEnabled = actions.toggling_shuffle ? false : true;

  // Handles
  const handleClick = async () => {
    const newShuffleState = !shuffleState;
    setPlayerback({ settings:{ shuffleMode: newShuffleState } });
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
