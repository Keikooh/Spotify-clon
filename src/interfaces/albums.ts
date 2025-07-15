import type {
  ExternalIDS,
  ExternalUrls,
  Image,
  Restrictions,
  Owner,
  Copyright,
  Paging
} from "./common";
import type { Tracks } from "./tracks";

export type Albums = Paging<Album>;

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: Owner[];
  tracks: Tracks;
  copyrights: Copyright[];
  external_ids: ExternalIDS;
  genres: any[];
  label: string;
  popularity: number;
}

export type SimplifiedAlbum = Omit<
  Album,
  "tracks" | "copyrighst" | "external_ids" | "genres" | "label" | "popularity"
>;
