export interface Track {
  uri: string;
  image: string;
  name: string;
  artists: string;
  duration: number;
  progress?:number
  albumName?: string;
  addedAt?: string;
  isPlaying?: boolean;
}
