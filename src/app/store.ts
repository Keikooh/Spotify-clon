import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  // state
  player: {
    isPlaying: false,
    playMode: "single",
    shuffleIsActive: false,
    repeatMode: "off",
    track: {
      name: "no name",
      artist: "no artist",
      image: null,
      duration: 0,
      progress: 0,
    },
  },
  // actions
  setPlayer: (partial) => {
    set((state) => ({
      player: {
        ...state.player,
        ...partial,
        track: partial.track ?? state.player.track,
      },
    }));
  },
}));
