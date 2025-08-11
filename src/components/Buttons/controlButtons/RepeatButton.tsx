import { usePlayerStore } from "../../../store/PlayerStore";
import { LuRepeat } from "react-icons/lu";
import {
  getAvailableDevices,
  setRepeatMode,
} from "../../../services/playerServices";
import { LuRepeat1 } from "react-icons/lu";
import ToggleButton from "@components/buttons/ToggleButton";
import type { ToggleButtonProps } from "@shared/types/buttonTypes";

const RepeatButton = () => {
  const playerState = usePlayerStore((state) => state.player);
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  const { repeatMode } = playerState;

  const rotateRepeatMode = (currentMode: "context" | "track" | "off") => {
    if (currentMode === "off") return "context";
    if (currentMode === "context") return "track";
    return "off";
  };

  const handleClick = async () => {
    const newRepeatMode = rotateRepeatMode(repeatMode);
    setPlayer({ repeatMode: newRepeatMode });

    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      await setRepeatMode(deviceId, newRepeatMode);
    }
  };

  const icon = repeatMode === "track" ? LuRepeat1 : LuRepeat;
  const button:ToggleButtonProps = {
    callback: handleClick,
    icon,
    title: "Repeat",
    isEnabled: true,
    isActive: repeatMode !== "off",
    mode: repeatMode,
  };
  
  return <ToggleButton {...button} />;
};

export default RepeatButton;
