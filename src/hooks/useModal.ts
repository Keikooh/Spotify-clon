import { useState } from "react";

export const useModal = ( defaultVisible:boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultVisible);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    close,
  };
};
