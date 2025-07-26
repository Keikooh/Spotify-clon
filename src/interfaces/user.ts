import type { Artist } from "./artists";
import type { ExternalUrls, Followers, Image, Paging } from "./common";
import type { Track } from "./tracks";

export interface User {
  display_name: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}

export type UserTopItems = {
  artists: UserTopArtist;
  tracks: UserTopTracks;
};

export type UserTopArtist = Paging<Artist>;
export type UserTopTracks = Paging<Track>;
