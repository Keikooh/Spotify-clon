import React, { useEffect, useState } from 'react'
import ResultSection from '../../components/ResultSection'
import { getSearchResult } from '../../services/SpotifyServices';
import { useParams } from 'react-router-dom';

const ArtistsResults = () => {
  const { query } = useParams();
  const accessToken = localStorage.getItem("access_token");
  const [artists, setartists] = useState([]);
  const [loading, setloading] = useState(true);

  const filterResult = (data) => {
  return data.filter((item) => item !== null && item.images);
};

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearchResult(accessToken, query, "artist");
      if(data){
        const { artists } = data;
        setartists(filterResult(artists.items))
        setloading(false)
      }
    }

    fetchData();
  }, [query])
  

  if (loading) return <p>Cargando elementos...</p>;

  return (
    <ResultSection
        title=""
        wrap={true}
        itemList={artists.map((artist) => ({
          id: artist.id,
          uri: artist.uri,
          image: artist.images[0]?.url,
          title: artist.name,
          subtitle: "Artist",
          type: "artist",
        }))}
        playMode="context"
      />
  )
}

export default ArtistsResults

