import type { Track } from "./Track";

export interface Player {
  isPlaying: boolean;
  playMode: string;
  shuffleIsActive: boolean;
  repeatMode: "off"|"context"|"track";
  track: Track;
}
