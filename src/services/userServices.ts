import { axiosInstance } from "./axiosInstance";

// Interfaces
import type { User, UserTopItems } from "../interfaces";

export const getUserTopItems = async <T extends keyof UserTopItems>(
  type: T
): Promise<UserTopItems[T]> => {
  const { data } = await axiosInstance.get<UserTopItems[T]>(
    `me/top/${type}?limit=5`
  );

  return data;
};

export const getUserProfile = async (): Promise<User> => {
  const { data } = await axiosInstance.get<User>(`me`);

  return data;
};

export const unfollowPlaylist = async (playlistId: string): Promise<void> => {
  await axiosInstance.delete(`playlists/${playlistId}/followers`);
};
