import { usePlay } from "../../hooks/usePlay";

// icons
import { FaPlay } from "react-icons/fa";
import Button from "@components/buttons/Button";
import type { ButtonProps, PlayButtonProps } from "@shared/types/buttonTypes";

const PlayButton = ({ buttonStyle, settings }: PlayButtonProps) => {
  const play = usePlay();

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
