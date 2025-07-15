import type { ExternalUrls, Image, Owner, Paging } from "./common";
import type { Tracks } from "./tracks";

export type Playlists = Paging<Playlist>

export interface Playlist {
    collaborative: boolean;
    description:   string;
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    owner:         Owner;
    public:        boolean;
    snapshot_id:   string;
    tracks:        Tracks;
    type:          string;
    uri:           string;
}


