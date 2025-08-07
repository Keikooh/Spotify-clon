import { useEffect } from "react";
import type { ToggleButtonProps } from "@shared/types/buttonTypes";

const ControlButton = ({
  callback,
  icon: Icon,
  title,
  isEnabled,
  isActive,
  mode,
}: ToggleButtonProps) => {
  useEffect(() => {}, [isEnabled, isActive, mode]);

  return (
    <button
      disabled={!isEnabled}
      className={`${
        isEnabled
          ? "opacity-80 cursor-pointer active:scale-90 hover:opacity-100"
          : "opacity-40 cursor-not-allowed"
      } ${isActive && "text-green-300 relative"}`}
      onClick={callback}
      title={title}
    >
      <Icon className={"size-5"} />
      {isActive && (
        <div className="absolute -bottom-1 left-1/3 size-1 rounded-full bg-green-300" />
      )}
    </button>
  );
};

export default ControlButton;
