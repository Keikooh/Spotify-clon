import { useEffect, useState } from "react";
import Playlists from "../Playlists/Playlists";
import { TbWaveSine } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { createPlaylist, getUserPlaylists } from "../../services/playlistServices";

const SideBar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [itemAdded, setitemAdded] = useState(false);
  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const handleClick = async () => {
    const data = await createPlaylist(accessToken, userId, "NewPlaylist", true, false, "" );

    if(data ){
      setitemAdded(true);
      const { id } = data;
      navigate(`/home/playlist/${id}`);
    }
  };

  useEffect(() => {
    if (!userId || !accessToken) return;

    const getUsersPlaylists = async () => {
      try {
        const data = await getUserPlaylists( accessToken, userId,);

        if (data && data.items) {
          setPlaylists(data.items);
          console.log({data: data.items[0].name})
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    getUsersPlaylists();
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
