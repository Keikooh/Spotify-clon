import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, MainHome, Callback, SearchResults, PlaylistDetail, LoginComponent } from './pages/index'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/home" element={<MainHome />}>
        <Route index element={<Home/>}/>
        <Route path="search" element={<SearchResults/>}/>
        <Route path="playlist/:id" element={<PlaylistDetail/>}/>
      </Route>
    </Routes>
  );
}

export default App;
