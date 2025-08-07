import { useState } from "react";
import type { ButtonProps } from "@shared/types/buttonTypes";


export const useButton = ({
  callback, 
  icon,
  title,
  text,
  isEnabled = false,
}: ButtonProps) => {
  
  const [disabled, setDisabled] = useState(isDisabled);
  
  const allow = () => {
    setDisabled(false);
  };

  const notAllow = () => {
    setDisabled(true);
  };

  return {
    callback,
    icon,
    title,
    text,
    disabled,
    allow,
    notAllow,
  };
};
