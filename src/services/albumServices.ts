import { axiosInstance } from "./axiosInstance";

// Interfaces
import type { Album } from "../interfaces";

export const getAlbum = async (
  accessToken: string,
  albumId: string
): Promise<Album> => {
  const { data } = await axiosInstance.get<Album>(`albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
