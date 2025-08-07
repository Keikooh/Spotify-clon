import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { AiOutlineHome } from "react-icons/ai";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import Button from "@components/buttons/Button";
import type { ButtonProps } from "@shared/types/buttonTypes";
import { buttonVariants } from "@shared/styles/buttonStyles";

type props = {
  image: string;
  name: string;
};

const MainNavbar: React.FC<props> = ({ image, name }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  const toBackButton: ButtonProps = {
    callback: handleGoBack,
    icon: GrFormPrevious,
    title: "Go back",
    buttonStyle: buttonVariants.filledGray,
    isEnabled: true,
  };

  const toForwardButton: ButtonProps = {
    callback: handleGoForward,
    icon: MdNavigateNext,
    title: "Go forward",
    buttonStyle: buttonVariants.filledGray,
    isEnabled: true,
  };

  return (
    <nav className="h-16 flex bg-black w-full  p-5 justify-between items-center">
      <div className="flex gap-x-2 w-1/3">
        <Button {...toBackButton} />
        <Button {...toForwardButton} />
      </div>
      <div className="flex gap-2 w-1/3 justify-center">
        <Link to={"/home"} className={buttonVariants.filledGray} title="Home">
          <AiOutlineHome className="text-md" />
        </Link>
        <SearchBar />
      </div>

      <div className="flex gap-2 items-center justify-end w-1/3">
        <span className="font-bold">{name}</span>
        <img className="rounded-full w-8 h-8 " src={image} />
      </div>
    </nav>
  );
};

export default MainNavbar;
