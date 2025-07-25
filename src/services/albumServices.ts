import { axiosInstance } from "./axiosInstance";

// Interfaces
import type { Album } from "../interfaces";

export const getAlbum = async (albumId: string): Promise<Album> => {
  const { data } = await axiosInstance.get<Album>(`albums/${albumId}`);

  return data;
};
