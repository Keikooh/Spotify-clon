import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { LuPen } from "react-icons/lu";

// Types
import type { ButtonProps } from "@shared/types/buttonTypes";
// Services
import {
  addCustomPlaylistCoverImage,
  changePlaylistDetails,
} from "@services/playlistServices";
// Components
import Button from "@components/buttons/Button";
import Modal from "./Modal";
// Styles
import { buttonVariants } from "@shared/styles/buttonStyles";

type props = {
  isOpen: boolean;
  close: () => void;
  callback: () => void;
  playlist: {
    title: string;
    description?: string | null;
    image: string;
  };
};
const ModalEditPlaylistDetails = ({
  isOpen,
  close,
  callback,
  playlist,
}: props) => {
  const {
    title: originalTitle,
    description: originalDescription,
    image,
  } = playlist;

  const { id } = useParams();
  const inputFile = useRef<HTMLInputElement>(null); // References the input file type
  const [coverImage, setCoverImage] = useState(image);
  const [base64, setBase64] = useState("");

  const [title, setTitle] = useState(originalTitle);
  const [description, setDescription] = useState(originalDescription);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    const reader = new FileReader();

    reader.readAsDataURL(image);

    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setBase64(base64);
    };

    if (image) {
      const newImage = URL.createObjectURL(image); // Create temporal URL
      setCoverImage(newImage);
    }
  };

  const handleSaveChanges = async () => {
    const originalImage = image.split("image/")[1];
    const newImage = coverImage.split("image/")[1];

    try {
      if (originalImage !== newImage) {
        await addCustomPlaylistCoverImage(id!, base64);
      }
      if (originalTitle !== title || originalDescription !== description) {
        await changePlaylistDetails(id!, title, description ? description : "");
      }

      callback();
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const button: ButtonProps = {
    callback: handleSaveChanges,
    icon: LuPen,
    title: "Save",
    buttonStyle: buttonVariants.pill,
    isEnabled: true,
    text: "Save",
  };

  const openModalButton: ButtonProps = {
    callback: () => {
      inputFile.current?.click();
    },
    icon: LuPen,
    title: "",
    buttonStyle: buttonVariants.transparent,
    isEnabled: true,
  };

  useEffect(() => {
    setTitle(playlist.title);
    setDescription(playlist.description);
    setCoverImage(playlist.image);
  }, [playlist]);

  return (
    <Modal isOpen={isOpen} close={close} title={"Edit details"}>
      <div className="flex flex-col gap-y-4">
        <div className="flex gap-x-3">
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jfif"
            ref={inputFile}
            onChange={handleUploadImage}
          />
          <div className="relative group rounded-sm size-45">
            <img
              src={coverImage}
              className="w-full h-full group-hover:brightness-40 object-cover"
            />
            <div className="hidden absolute inset-0 group-hover:flex flex-col  items-center  gap-y-2 justify-center font-semibold">
              <Button {...openModalButton} />
            </div>
          </div>

          <div className="flex flex-col gap-y-3 justify-between flex-1 text-sm font-semibold">
            <input
              type="text"
              className="rounded-sm bg-black/30 p-2"
              value={title}
              placeholder="Add a name"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <textarea
              className="rounded-sm bg-black/30 flex-1 p-2"
              style={{ resize: "none" }}
              value={description ? description : ""}
              placeholder="Add an optional description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button {...button} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditPlaylistDetails;
