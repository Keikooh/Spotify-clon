import { axiosInstance } from "./axiosInstance";

// Interfaces
import type { User, UserTopItems } from "../interfaces";

export const getUserTopItems = async <T extends keyof UserTopItems>(
  accessToken: string,
  type: T
): Promise<UserTopItems[T]> => {
  const { data } = await axiosInstance.get<UserTopItems[T]>(
    `me/top/${type}?limit=5`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const getUserProfile = async (
  accessToken: string
): Promise<User> => {
  const { data } = await axiosInstance.get<User>(`me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const unfollowPlaylist = async (
  accessToken: string,
  playlistId: string
): Promise<void> => {
  await axiosInstance.delete(`playlists/${playlistId}/followers`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};


