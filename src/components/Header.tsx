import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { AiOutlineHome } from "react-icons/ai";
import SearchBar from "./SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  image: string;
  name: string;
};

const Header: React.FC<HeaderProps> = ({ image, name }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };
  return (
    <nav className="h-16 flex bg-black w-full  p-5 justify-between items-center">
      <div className="flex gap-2 w-1/3">
        <div className="rounded-full p-3 bg-gray-900 cursor-pointer hover:scale-105 hover:bg-gray-800" onClick={handleBack}>
          <GrFormPrevious className="" />
        </div>
        <div className="rounded-full p-3 bg-gray-900 cursor-pointer hover:scale-105 hover:bg-gray-800" onClick={handleForward}>
          <MdNavigateNext className="" />
        </div>
      </div>
      <div className="flex gap-2 w-1/3 justify-center">
        <button className="p-2 dark:bg-gray-900 rounded-full flex items-center justify-center">
          <AiOutlineHome className="text-xl" />
        </button>
        <SearchBar />
      </div>

      <div className="flex gap-2 items-center justify-end w-1/3">
        <span className="font-bold">{name}</span>
        <img className="rounded-full w-8 h-8 " src={image} />
      </div>
    </nav>
  );
};

export default Header;
