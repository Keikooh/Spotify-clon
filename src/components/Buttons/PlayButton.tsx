import { usePlayer } from "../../hooks/usePlayer";

// icons
import { FaPlay } from "react-icons/fa";
import Button from "@components/buttons/Button";
import type { ButtonProps, PlayButtonProps } from "@shared/types/buttonTypes";

// top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2

const PlayButton = ({ buttonStyle, settings }: PlayButtonProps) => {
  const play = usePlayer();

  const callback = () => {
    play(settings);
  };

  const button: ButtonProps = {
    callback,
    icon: FaPlay,
    title: "Play",
    isEnabled: true,
    buttonStyle,
  };
  return <Button {...button} />;
};

export default PlayButton;
