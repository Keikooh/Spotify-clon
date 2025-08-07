import { useEffect } from "react";
import { usePlayerStore } from "../../../app/store";
import type { ButtonProps } from "@shared/types/buttonTypes";
import { IoIosPause, IoMdPlay } from "react-icons/io";
import Button from "@components/buttons/Button";
import {
  getAvailableDevices,
  pausePlayerBack,
} from "../../../services/playerServices";
import { buttonVariants } from "../../../shared/styles/buttonStyles";

const ResumeButton = () => {
  // Store
  const playerState = usePlayerStore((state) => state.player);
  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const { isPlaying } = playerState;

  const handlePause = async () => {
    const devices = await getAvailableDevices();

    if (devices) {
      const deviceId = devices.devices[0].id;
      await pausePlayerBack(deviceId);
    }
    setPlayer({ isPlaying: false });
  };

  const handleResume = async () => {
    setPlayer({ isPlaying: true });
  };

  useEffect(() => {}, [isPlaying]);

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
