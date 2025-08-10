import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Callback, LoginComponent } from "./pages/index";
import { AppLayout, SearchResultsLayout} from "./layouts/index"
import {
  ArtistsResults,
  AllResults,
  PlaylistsResults,
  PodcastsResults,
  TracksResults,
  AlbumsResults,
} from "./pages/Search/index";
import { AlbumDetail, ArtistDetail, PlaylistDetail} from "./pages/Details/index"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/home" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="search/:query" element={<SearchResultsLayout />}>
          <Route index element={<AllResults />} />
          <Route path="tracks" element={<TracksResults />} />
          <Route path="albums" element={<AlbumsResults />} />
          <Route path="artists" element={<ArtistsResults />} />
          <Route path="playlists" element={<PlaylistsResults />} />
          <Route path="shows" element={<PodcastsResults />} />
        </Route>
        <Route path="playlist/:id" element={<PlaylistDetail/>} />
        <Route path="album/:id" element={<AlbumDetail />} />
        <Route path="artist/:id" element={<ArtistDetail/>} />
      </Route>
    </Routes>
  );
}

export default App;
