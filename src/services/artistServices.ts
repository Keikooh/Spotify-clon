import { axiosInstance } from "./axiosInstance";

// Interfaces
import type { Artist, TopTracks } from "../interfaces";

export const getArtist = async (artistId: string): Promise<Artist> => {
  const { data } = await axiosInstance.get<Artist>(`artists/${artistId}`);

  return data;
};

export const getArtistTopTrack = async (
  artistId: string
): Promise<TopTracks> => {
  const { data } = await axiosInstance.get<TopTracks>(
    `artists/${artistId}/top-tracks`
  );

  return data;
};
