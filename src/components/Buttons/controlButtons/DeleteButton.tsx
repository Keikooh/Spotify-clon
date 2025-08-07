import React from "react";
import Button from "@components/buttons/Button";
import { FaTrashAlt } from "react-icons/fa";
import { unfollowPlaylist } from "../../../services/userServices";
import { useNavigate, useParams } from "react-router-dom";
import type { ButtonProps } from "@shared/types/buttonTypes";
import { buttonVariants } from "@shared/styles/buttonStyles";

const DeleteButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClick = async () => {
    await unfollowPlaylist(id);

    navigate("/home");
  };

  const button: ButtonProps = {
    callback: handleClick,
    icon: FaTrashAlt,
    title: "Delete",
    buttonStyle: buttonVariants.transparent,
    isEnabled: true,
  };

  return <Button {...button} />;
};

export default DeleteButton;
