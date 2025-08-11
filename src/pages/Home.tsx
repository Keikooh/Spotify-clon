import React, { useEffect, useState } from "react";
import ResultSection from "../components/ResultSection";
import Playlists from "@components/Playlists";
import { getUserTopItems } from "../services/userServices";
import { getUserPlaylists } from "../services/playlistServices";

const Home = () => {
  const userId = localStorage.getItem("user_id");
  const [playlists, setplaylists] = useState([]);
  const [topArtists, settopArtists] = useState([]);
  const [topTracks, settopTracks] = useState([]);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      const data = await getUserPlaylists(userId);
      if (data) {
        setplaylists(data.items);
      }
    };

    const getTopItems = async () => {
      const artists = await getUserTopItems("artists");
      const tracks = await getUserTopItems("tracks");

      if (artists) {
        settopArtists(artists.items);
        settopTracks(tracks.items);
      }
    };

    getTopItems();
    fetchUserPlaylists();
  }, []);

  return (
    <div className="flex flex-col h-full overflow-y-auto gap-y-10">
      <Playlists displayMode="grid" playlists={playlists.slice(0,8)} />
      <ResultSection
        title="Top artists"
        wrap={false}
        itemList={topArtists.map((artist) => ({
          id: artist.id,
          uri: artist.uri,
          image: artist.images[0].url,
          title: artist.name,
          subtitle: "Artist",
          type: "artist",
        }))}
        path="artist"
        playMode="context"
      />
    </div>
  );
};

export default Home;
