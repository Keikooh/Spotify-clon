import { useEffect } from "react";
import { usePlayerbackStore } from "../../../store/PlayerbackStore";
import type { ButtonProps } from "@shared/types/buttonTypes";
import { IoIosPause, IoMdPlay } from "react-icons/io";
import Button from "@components/buttons/Button";
import {
  getAvailableDevices,
  pausePlayerBack,
} from "@services/playerServices";
import { buttonVariants } from "@shared/styles/buttonStyles";
import { usePlay } from "../../../hooks/usePlay";

const ResumeButton = () => {
  // Store
  const playerback = usePlayerbackStore((state) => state.playerback);
  const setPlayerback = usePlayerbackStore((state) => state.setPlayerback);
  const { settings: { isPlaying} } = playerback;

  const play = usePlay();

  const handlePause = async () => {
    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      await pausePlayerBack(deviceId);
    }
    setPlayerback({ settings: { isPlaying: false } });
  };

  const handleResume = async () => {
    play();
    setPlayerback({ settings: { isPlaying: true } });
  };

  const callback = isPlaying ? handlePause : handleResume;
  const icon = isPlaying ? IoIosPause : IoMdPlay;
  const title = isPlaying ? "Pause" : "Resume";

  const button: ButtonProps = {
    callback,
    icon,
    title,
    isEnabled: true,
    buttonStyle: buttonVariants.filledWhite,
  };
  return <Button {...button} />;
};

export default ResumeButton;
