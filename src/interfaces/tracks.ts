import type {
  ExternalUrls,
  Restrictions,
  ExternalIDS,
  Owner,
  LinkedFrom,
  Paging
} from "./common";
import type { Album, SimplifiedAlbum } from "./albums";

export type Tracks = Paging<TrackInfo | Track | SimplifiedTrack>

export type DetailedTracks = Paging<TrackInfo>;

export type SimplifiedTracks = Pick<Tracks, "href" | "total">;

export interface TrackInfo {
  added_at: string;
  added_by: Owner;
  is_local: boolean;
  track: Track;
}

export interface Track {
  album: Album | SimplifiedAlbum;
  artists: Owner[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: LinkedFrom;
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export type SimplifiedTrack = Omit<Track, "album" | "external_ids" | "popularity">;

export interface TopTracks {
    tracks: Track[];
}