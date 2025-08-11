import { createBrowserRouter, redirect } from "react-router-dom";

// Layouts
import { AppLayout, SearchResultsLayout } from "./layouts";

// Pages
import { Callback, Home, Login, NotFound } from "./pages";
import { AlbumDetail, ArtistDetail, PlaylistDetail } from "./pages/details";
import {
  AlbumsResults,
  AllResults,
  ArtistsResults,
  PlaylistsResults,
  TracksResults,
} from "./pages/search";
import PodcastsResult from "./pages/search/PodcastsResult";

const homeLoader = () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw redirect("/");
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },
  {
    path: "/home",
    element: <AppLayout />,
    loader: homeLoader,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "album/:id",
        element: <AlbumDetail />,
      },
      {
        path: "artist/:id",
        element: <ArtistDetail />,
      },
      {
        path: "playlist/:id",
        element: <PlaylistDetail />,
      },
      {
        path: "album/:id",
        element: <AlbumDetail />,
      },
      {
        path: "search/:query",
        element: <SearchResultsLayout />,
        children: [
          {
            path: "",
            element: <AllResults />,
          },
          {
            path: "albums",
            element: <AlbumsResults />,
          },
          {
            path: "artists",
            element: <ArtistsResults />,
          },
          {
            path: "playlists",
            element: <PlaylistsResults />,
          },
          {
            path: "shows",
            element: <PodcastsResult />,
          },
          {
            path: "tracks",
            element: <TracksResults />,
          },
        ],
      },
    ],
  },
]);
