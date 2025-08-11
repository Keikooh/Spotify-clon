import { useEffect, useState } from "react";
import Playlists from "./Playlists";
import { TbWaveSine } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  createPlaylist,
  getUserPlaylists,
} from "../services/playlistServices";
import Button from "@components/buttons/Button";
import type { ButtonProps } from "@shared/types/buttonTypes";
import { buttonVariants } from "@shared/styles/buttonStyles";

const AsideBar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [itemAdded, setitemAdded] = useState(false);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const handleClick = async () => {
    const data = await createPlaylist(userId, "NewPlaylist", true, false, "");

    if (data) {
      setitemAdded(true);
      const { id } = data;
      navigate(`/home/playlist/${id}`);
    }
  };

  useEffect(() => {
    const getUsersPlaylists = async () => {
      try {
        const data = await getUserPlaylists(userId);

        if (data && data.items) {
          setPlaylists(data.items);
          console.log({ data: data.items[0].name });
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    getUsersPlaylists();
  }, [itemAdded]);

  const button: ButtonProps = {
    callback: handleClick,
    icon: FiPlus,
    title: "Create a playlist",
    text: "Create",
    isEnabled: true,
    buttonStyle: buttonVariants.pill,
  };
  return (
    <aside className="flex flex-col gap-y-3 w-1/4 bg-gray-950 px-2 pt-5 pb-2 overflow-y-auto h-full">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Your library</h3>
        <Button {...button} />
      </div>
      <Playlists displayMode="list" playlists={playlists} />
    </aside>
  );
};

export default AsideBar;
