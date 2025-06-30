import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  MainHome,
  Callback,
  SearchResults,
  PlaylistDetail,
  LoginComponent,
  ArtistsResults,
  AllResults,
  PlaylistsResults,
  PodcastsResults
} from "./pages/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/home" element={<MainHome />}>
        <Route index element={<Home />} />
        <Route path="search/:query" element={<SearchResults />}>
          <Route index element={<AllResults />} />
          {/* <Route path="tracks" element={}/>
          <Route path="albums" element={}/> */}
          <Route path="artists" element={<ArtistsResults />} />
          <Route path="playlists" element={<PlaylistsResults/>}/>
          <Route path="shows" element={<PodcastsResults/>}/>
        </Route>
        <Route path="playlist/:id" element={<PlaylistDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
