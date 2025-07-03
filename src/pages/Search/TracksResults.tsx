import { useParams } from "react-router-dom";
import Table from "../../components/tables/Table";
import { useEffect, useState } from "react";
import { getSearchResult } from "../../services/SpotifyServices";
import type { Track } from "../../models/Track";

const TracksResults = () => {
  const { query } = useParams();
  const accessToken = localStorage.getItem("access_token");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setloading] = useState(true);

  const filterResult = (data) => {
  return data.filter((item) => item !== null );
};

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearchResult(accessToken, query, "track");
      if(data){
        const { tracks } = data;
        setTracks(filterResult(tracks.items))
        setloading(false)
      }
    }

    fetchData();
  }, [query])
  

  
  if (loading) return <p>Cargando elementos...</p>;
  
  
  
  return (
    <Table
      type="tracks"
      tracks={tracks.map((item) => ({
        uri: item.uri,
        image: item.album.images[0].url,
        name: item.name,
        artists: item.artists.map((artist) => artist.name).join(", "),
        duration: item.duration_ms,
        albumName: item.album.name,
      }))}
    />
  );
};

export default TracksResults;
