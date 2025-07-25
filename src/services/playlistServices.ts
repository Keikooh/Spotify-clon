import { axiosInstance } from "./axiosInstance";

// Interfaces
import type { Playlist, SimplifiedPlaylists } from "../interfaces";

export const createPlaylist = async (
  userId: string,
  name: string,
  isPublic: boolean,
  collaborative: boolean,
  description: string
): Promise<Playlist> => {
  const { data } = await axiosInstance.post<Playlist>(
    `users/${userId}/playlists`,
    {
      name: name,
      public: isPublic,
      collaborative: collaborative,
      description: description,
    }
  );

  return data;
};

export const getPlaylist = async (playlistId: string): Promise<Playlist> => {
  const { data } = await axiosInstance.get<Playlist>(`playlists/${playlistId}`);

  return data;
};

export const getUserPlaylists = async (
  userId: string
): Promise<SimplifiedPlaylists> => {
  const { data } = await axiosInstance.get<SimplifiedPlaylists>(
    `users/${userId}/playlists`
  );

  return data;
};
