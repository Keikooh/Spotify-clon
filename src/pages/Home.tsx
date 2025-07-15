import React, { useEffect, useState } from "react";
import ResultSection from "../components/ResultSection";
import Playlists from "../components/Playlists/Playlists";
import { getUserTopItems } from "../services/userServices";
import { getUserPlaylists } from "../services/playlistServices";

const Home = () => {
  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  const [playlists, setplaylists] = useState([]);
  const [topArtists, settopArtists] = useState([]);
  const [topTracks, settopTracks] = useState([]);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      const data = await getUserPlaylists(accessToken, userId);
      if (data) {
        setplaylists(data.items);
      }
    };

    const getTopItems = async () => {
      const artists = await getUserTopItems(accessToken, "artists");
      const tracks = await getUserTopItems(accessToken, "tracks");

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
      <Playlists style="horizontal" list={playlists} />
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
