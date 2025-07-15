import type { Tracks } from "./tracks";
import type { Artists } from "./artists";
import type { Albums } from "./albums";
import type { Playlists } from "./playlists";
import type { Shows } from "./shows"

export interface SearchResults {
  tracks: Tracks;
  artists: Artists;
  albums: Albums;
  playlists: Playlists;
  shows: Shows;
  // episodes:   Episodes;
  // audiobooks: Audiobooks;
}
