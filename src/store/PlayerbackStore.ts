import type { Playerback } from "@shared/types/common";
import { create } from "zustand";

export const usePlayerbackStore = create((set) => ({
  // state
  playerback: {
    track: {
      name: "",
      artists: "",
      image: "",
      duration: 0,
    },
    settings: {
      progress: 0,
      isPlaying: false,
      volume: 0,
      shuffleMode: false,
      repeatMode: "",
      actions: {
        toggling_repeat_context: false,
        toggling_repeat_track: false,
        toggling_shuffle: false,
      },
    },
  },

  // actions
  setPlayerback: (partial: Partial<Playerback>) => {
    set((state: { playerback: Playerback }) => ({
      playerback: {
        track: partial.track ?? state.playerback.track, // If track isn't provided, use the previous one
        settings: partial.settings
          ? { ...state.playerback.settings, ...partial.settings } // If some settings properties have changed, keep the rest and updated the new ones
          : state.playerback.settings, // Otherwise, keep the previous settings as is
      },
    }));
  },
}));
