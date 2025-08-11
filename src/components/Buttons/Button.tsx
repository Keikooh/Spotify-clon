import type { ButtonProps } from "@shared/types/buttonTypes";

const Button = ({
  callback,
  icon: Icon,
  title,
  buttonStyle,
  isEnabled,
  text,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={callback}
      title={title}
      disabled={!isEnabled}
      className={`transition duration-150 ease-in-out ${
        isEnabled
          ? "brightness-90  cursor-pointer active:scale-90 hover:scale-110 hover:brightness-100 hover:cursor-pointer"
          : "opacity-40 cursor-not-allowed"
      } ${buttonStyle}`}
    >
      <Icon />
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
