import { useNavigate } from "react-router-dom";
import PlayButton from "../../Buttons/PlayButton";

const Playlist = ({ data }) => {
  const { name, images, owner, id, uri } = data;

  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/home/playlist/${id}`);
  };

  return (
    <li
      className="flex gap-2 w-full p-2 cursor-pointer hover:bg-gray-800 transition duration-150"
      onClick={() => handleClick(id)}
    >
      <div className="relative group">
        <img className="w-14 h-14 rounded-sm group-hover:brightness-50" src={images[0].url} alt={name} />
        <PlayButton
          uri={uri}
          playMode="context"
          isArtist={false}
          variant="onImage"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-semibold">{name}</p>
        <p className="opacity-50 text-sm">{owner.display_name}</p>
      </div>
    </li>
  );
};

export default Playlist;
