export type PlaySettings = {
  uri: string;
  playMode: PlayMode;
  mediaItem: MediaItem;
  progress: number;
  isPlaying: boolean;
  offSetPosition?: number;
};

export type Playerback = {
  track: {
    name: string;
    artists: string;
    image: string;
    duration: number;
  };
  settings: Pick<PlaySettings, "progress" | "isPlaying"> & {
    volume: number;
    shuffleMode: boolean;
    repeatMode: RepeatMode;
    actions: {
      toggling_repeat_context?: boolean;
      toggling_repeat_track?: boolean;
      toggling_shuffle?: boolean;
    };
  };
};

// Repeat mode
export const RepeatModes = {
  Track: "track",
  Context: "context",
  Off: "off",
};

export type RepeatMode = (typeof RepeatModes)[keyof typeof RepeatModes];

export const PlayModes = { Single: "single", Context: "context" };

export type PlayMode = (typeof PlayModes)[keyof typeof PlayModes];

export const MediaItems = {
  Album: "album",
  Playlist: "playlist",
  Artist: "artist",
  Track: "track",
};

export type MediaItem = (typeof MediaItems)[keyof typeof MediaItems];
