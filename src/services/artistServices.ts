import { axiosInstance } from "./axiosInstance";

// Interfaces
import type { Artist, TopTracks } from "../interfaces";

export const getArtist = async (
  accessToken: string,
  artistId: string
): Promise<Artist> => {
  const { data } = await axiosInstance.get<Artist>(`artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const getArtistTopTrack = async (
  accessToken: string,
  artistId: string
): Promise<TopTracks> => {
  const { data } = await axiosInstance.get<TopTracks>(`artists/${artistId}/top-tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data
};
