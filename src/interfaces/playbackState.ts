import type { Device } from "./devices"
import type { ExternalUrls } from "./common";
import type { Track } from "./tracks";

export interface PlaybackState {
    device:                 Device;
    repeat_state:           string;
    shuffle_state:          boolean;
    context:                Context;
    timestamp:              number;
    progress_ms:            number;
    is_playing:             boolean;
    item:                   Track;
    currently_playing_type: string;
    actions:                Actions;
}

export interface Actions {
    interrupting_playback:   boolean;
    pausing:                 boolean;
    resuming:                boolean;
    seeking:                 boolean;
    skipping_next:           boolean;
    skipping_prev:           boolean;
    toggling_repeat_context: boolean;
    toggling_shuffle:        boolean;
    toggling_repeat_track:   boolean;
    transferring_playback:   boolean;
}

export interface Context {
    type:          string;
    href:          string;
    external_urls: ExternalUrls;
    uri:           string;
}