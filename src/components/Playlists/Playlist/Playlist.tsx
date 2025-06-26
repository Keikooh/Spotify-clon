import { useNavigate } from "react-router-dom";
import PlayButton from "../../Buttons/PlayButton";

const Playlist = ({ data, style }) => {
  const { name, images, owner, id, uri } = data;

  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/home/playlist/${id}`);
  };

  const variantClasses = {
    vertical: "w-full hover:bg-gray-900",
    horizontal: "bg-gray-900 hover:bg-gray-700 rounded-lg",
  };

  const isHorizontal = style === "horizontal" ? true : false;
  return (
    <li
      className={`${variantClasses[style]} ${ isHorizontal && "relative group" } flex gap-2 p-2 cursor-pointer transition duration-150 `}
      onClick={() => handleClick(id)}
    >
      <div className="relative group">
        <img
          className={`${ !isHorizontal && "group-hover:brightness-50"} w-14 h-14 rounded-sm `}
          src={images[0].url}
          alt={name}
        />
        {style === "vertical" && (
          <PlayButton
            uri={uri}
            playMode="context"
            isArtist={false}
            variant="onImage"
          />
        )}
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-semibold">{name}</p>
        {
          !isHorizontal && (<p className="opacity-50 text-sm">{owner.display_name}</p>)
        }
      </div>

      {isHorizontal && (
          <PlayButton
            uri={uri}
            playMode="context"
            isArtist={false}
            variant="floating"
            styles="size-12 hidden absolute bottom-1/5 right-2 group-hover:flex"
          />
        )}
    </li>
  );
};

export default Playlist;
