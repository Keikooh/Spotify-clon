import React from 'react'
import ControlButton from './ControlButton';
import { FaTrashAlt } from "react-icons/fa";
import { unfollowPlaylist } from '../../services/SpotifyServices';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteButton = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const accessToken = localStorage.getItem("access_token");
  const handleDelete = async () => {
    await unfollowPlaylist(accessToken, id);

    navigate("/home")
  }

  return (
    <ControlButton
      message="Repeat"
      isEnabled={true}
      icon={FaTrashAlt}
      handleClick={handleDelete}
      size=""

    >
    </ControlButton>
  );
}

export default DeleteButton