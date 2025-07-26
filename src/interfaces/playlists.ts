import type { ExternalUrls, Image, Owner, Paging } from "./common";
import type { PlaylistTracks } from "./tracks";

export type Playlists = Paging<Playlist>;

export type SimplifiedPlaylists = Paging<Playlist<PlaylistTrackInfo>>

interface PlaylistTrackInfo {
    href: string
    total: number
}

export interface Playlist<T = PlaylistTracks> {
  collaborative: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: T;
  type: string;
  uri: string;
  description?: string | null;
}
