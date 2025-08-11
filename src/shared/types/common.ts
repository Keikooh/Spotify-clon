export type PlaySettings = {
  uri: string;
  playMode: PlayMode;
  mediaItem: MediaItem;
  progress: number;
  isPlaying: boolean;
  offSetPosition?: number;
};

export const PlayModes = {
  Context: "context",
  Single: "single",
};

export type PlayMode = (typeof PlayModes)[keyof typeof PlayModes];

export const MediaItems = {
  Album: "album",
  Playlist: "playlist",
  Artist: "artist",
  Track: "track",
};

export type MediaItem = (typeof MediaItems)[keyof typeof MediaItems];


