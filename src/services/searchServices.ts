import { axiosInstance } from "./axiosInstance";

// Interfaces
import type { SearchResults } from "../interfaces";

export const searchForItem = async (
  q: string,
  type: string
): Promise<SearchResults> => {
  const { data } = await axiosInstance.get<SearchResults>("search", {
    params: {
      q: q,
      type: type,
      limit: 20,
    },
  });

  return data;
};
