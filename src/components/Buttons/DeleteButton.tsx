import React from 'react'
import ControlButton from './ControlButton';
import { FaTrashAlt } from "react-icons/fa";
import { unfollowPlaylist } from '../../services/userServices';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteButton = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const handleDelete = async () => {
    await unfollowPlaylist(id);

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