import { useEffect, useState } from "react";
import { fetchUserPlaylists } from "./SideBar.service";
import Playlists from "../Playlists/Playlists";
import { TbWaveSine } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { createPlaylist } from "../../services/SpotifyServices";

const SideBar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [itemAdded, setitemAdded] = useState(false);
  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const handleClick = async () => {
    const data = await createPlaylist(accessToken, userId, {
      name: "New playlist",
      description: "",
      public: true,
    });

    if(data ){
      setitemAdded(true);
      const { id } = data;
      navigate(`/home/playlist/${id}`);
    }
  };

  useEffect(() => {
    if (!userId || !accessToken) return;

    const getUserPlaylists = async () => {
      try {
        const data = await fetchUserPlaylists(userId, accessToken);

        if (data && data.items) {
          setPlaylists(data.items);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    getUserPlaylists();
  }, [itemAdded]);

  return (
    <aside className="flex flex-col gap-y-3 w-1/4 bg-gray-950 px-2 pt-5 pb-2 overflow-y-auto h-full">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Your library</h3>
        <button
          className="flex items-center gap-2 bg-gray-900 rounded-full px-4 py-1 cursor-pointer hover:bg-gray-700 hover:scale-105 transition duration-150"
          onClick={handleClick}
        >
          <FiPlus />
          Create
        </button>
      </div>
      <Playlists style="vertical" list={playlists} />
    </aside>
  );
};

export default SideBar;
