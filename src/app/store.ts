import { create } from "zustand";
import type { Player } from "../models/Player";

export const usePlayerStore = create((set) => ({
  // state
  player: {
    isPlaying: false,
    playMode: "single",
    shuffleIsActive: false,
    repeatMode: "off",
    track: {
      name: "",
      artist: "",
      image: null,
      duration: 0,
      progress: 0,
    },
  },

  // actions
  setPlayer: (partial: Partial<Player>) => {
    set((state: { player: Player }) => ({
      player: {
        ...state.player,
        ...partial,
        track: partial.track ?? state.player.track,
      },
    }));
  },
}));
