import type {
  ExternalIDS,
  ExternalUrls,
  Image,
  Restrictions,
  Owner,
  Copyright,
  Paging
} from "./common";
import type { AlbumTracks } from "./tracks";

export type Albums = Paging<Album>;
export type SimplifiedAlbums = Paging<SimplifiedAlbum>;

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
  tracks: AlbumTracks;
  copyrights: Copyright[];
  external_ids: ExternalIDS;
  genres: string[];
  label: string;
  popularity: number;
}

export type SimplifiedAlbum = Omit<
  Album,
  "tracks" | "copyrights" | "external_ids" | "genres" | "label" | "popularity"
>;
