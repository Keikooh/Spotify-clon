import type { ExternalUrls, Followers, Image, Paging } from "./common";

export type Artists = Paging<Artist>;

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
