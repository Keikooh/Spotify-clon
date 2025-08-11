import type { PlaySettings } from "./common";

export type ButtonProps = {
  callback: () => void;
  icon: React.ElementType;
  title: string;
  buttonStyle: string;
  isEnabled: boolean;
  text?: string;
};

export type ToggleButtonProps = Omit<ButtonProps, "text" | "buttonStyle"> & {
  isActive: boolean;
  mode?: "context" | "track" | "off";
};

export type PlayButtonProps = {
  buttonStyle: string;
  settings: PlaySettings;
};
