import type { Tracks } from "./tracks";
import type { Artists } from "./artists";
import type { SimplifiedAlbums } from "./albums";
import type { SimplifiedPlaylists } from "./playlists";
import type { Shows } from "./shows"


export interface SearchResults {
  tracks: Tracks;
  artists: Artists;
  albums: SimplifiedAlbums;
  playlists: SimplifiedPlaylists;
  shows: Shows;
  // episodes:   Episodes;
  // audiobooks: Audiobooks;
}
