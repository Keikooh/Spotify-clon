import React, { Children, useEffect } from "react";

type props = {
  message: string;
  isEnabled: boolean;
  icon: React.ElementType;
  handleClick: () => void;
  styles?:string;
  children?:React.ReactNode;
  size?: string;
  isActive?: boolean;
  mode?:'context'|'track'|'off';
};

const ControlButton: React.FC<props> = ({
  message,
  isEnabled,
  icon: Icon,
  handleClick,
  styles,
  children,
  size,
  isActive,
  mode
}) => {
  useEffect(() => {}, [isEnabled, isActive, mode]);

  return (
    <button
      disabled={!isEnabled}
      className={`${
        isEnabled
          ? "opacity-80 cursor-pointer active:scale-90 hover:opacity-100"
          : "opacity-40 cursor-not-allowed"
      } ${styles}`}
      onClick={handleClick}
      title={message}
    >
      <Icon className={size ? { size } : "size-9"} />
      {children}
    </button>
  );
};

export default ControlButton;
