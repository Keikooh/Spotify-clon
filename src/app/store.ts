import { create } from 'zustand';

export const useTrackStore = create( ( set ) => ({
    // state
    track: { 
        name: "no name",
        artist: "no artist",
        image: null,
        duration: 0,
        progress: 0,
        isPlaying: false,
    },
    // actions
    setTrack: ( track ) => {
        set( ( state ) => ({ track }));
    },
}));
