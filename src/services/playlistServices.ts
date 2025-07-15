import { axiosInstance } from "./axiosInstance";

// Interfaces
import type { Playlist, SimplifiedPlaylists } from "../interfaces";

export const createPlaylist = async (
  accessToken: string,
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
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const getPlaylist = async (
  accessToken: string,
  playlistId: string
): Promise<Playlist> => {
    const { data } = await axiosInstance.get<Playlist>(`playlists/${playlistId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    return data;
};

export const getUserPlaylists = async (
  accessToken: string,
  userId: string
): Promise<SimplifiedPlaylists> => {
  const { data } = await axiosInstance.get<SimplifiedPlaylists>(
    `users/${userId}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};