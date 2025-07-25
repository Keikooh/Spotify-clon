import React, { useEffect, useState } from 'react'
import ResultSection from '../../components/ResultSection';
import { useParams } from 'react-router-dom';
import { searchForItem } from '../../services/searchServices';

const PlaylistsResults = () => {
  const { query } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setloading] = useState(true);

  const filterResult = (data) => {
  return data.filter((item) => item !== null && item.images);
};

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchForItem(query, "playlist");
      if(data){
        const { playlists } = data;
        setPlaylists(filterResult(playlists.items))
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
        itemList={playlists.map((playlist) => ({
          id: playlist.id,
          uri: playlist.uri,
          image: playlist.images[0]?.url,
          title: playlist.name,
          subtitle: `By ${playlist.owner.display_name}`,
          type: "album",
        }))}
        path="playlist"
        playMode="context"
      />
  )
}

export default PlaylistsResults