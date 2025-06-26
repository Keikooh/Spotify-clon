import React, { useEffect, useState } from "react";
import ResultSection from "../components/ResultSection";
import { fetchUserPlaylists } from "../components/SideBar/SideBar.service";
import Playlists from "../components/Playlists/Playlists";
import { getUsersTopItems } from "../services/SpotifyServices";

const Home = () => {
  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  const [playlists, setplaylists] = useState([]);
  const [topArtists, settopArtists] = useState([]);
  const [topTracks, settopTracks] = useState([]);

  useEffect(() => {
    const getUserPlaylists = async () => {
      const data = await fetchUserPlaylists(userId, accessToken);
      if (data) {
        setplaylists(data.items);
      }
    };

    const getTopItems = async () => {
      const artists = await getUsersTopItems(accessToken, "artists");
      const tracks = await getUsersTopItems(accessToken, "tracks");

      if (artists) {
        settopArtists(artists.items);
        settopTracks(tracks.items);
      }
    };

    getTopItems();
    getUserPlaylists();
  }, []);

  return (
    <div className="flex flex-col h-full overflow-y-auto gap-y-10">
      <Playlists style="horizontal" list={playlists} />
      <ResultSection
        title="Top artists"
        itemList={topArtists.map((artist) => ({
          id: artist.id,
          uri: artist.uri,
          image: artist.images[0].url,
          title: artist.name,
          subtitle: "Artist",
          type: "artist",
        }))}
        playMode="context"
      />
    </div>
  );
};

export default Home;
