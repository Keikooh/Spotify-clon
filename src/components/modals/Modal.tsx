
import { type ReactNode } from "react";
import { IoIosClose } from "react-icons/io";
// Types
import type { ButtonProps } from "@shared/types/buttonTypes";
// Components
import Button from "@components/buttons/Button";

type props = {
  isOpen: boolean; //
  close: () => void; //
  title: string;
  children: ReactNode; //
};
const Modal = ({ isOpen, close, title, children }: props) => {
  const button: ButtonProps = {
    callback: close,
    icon: IoIosClose,
    title: "Close",
    buttonStyle: "text-3xl font-bold",
    isEnabled: true,
  };

  return (
    <div
      className={`absolute inset-0 z-1 ${
        isOpen ? "flex" : "hidden"
      } bg-black/60 justify-center items-center shadox-2xl`}
    >
      <div className="bg-gray-900 shadox-xl w-125 h-fit rounded-xl p-5">
        <div className="w-full flex justify-between items-center mb-5">
          <h3 className="text-2xl font-bold">{title}</h3>
          <Button {...button} />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
