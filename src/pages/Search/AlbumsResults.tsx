import React, { useEffect, useState } from "react";
import ResultSection from "../../components/ResultSection";
import { useParams } from "react-router-dom";
import { searchForItem } from "../../services/searchServices";

const AlbumsResults = () => {
  const { query } = useParams();
  const [albums, setAlbums] = useState([]);
  const [loading, setloading] = useState(true);

  const filterResult = (data) => {
    return data.filter((item) => item !== null && item.images);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchForItem(query, "album");
      if (data) {
        const { albums } = data;
        setAlbums(filterResult(albums.items));
        setloading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) return <p>Cargando elementos...</p>;

  return (
    <ResultSection
      title=""
      wrap={true}
      itemList={albums.map((album) => ({
        id: album.id,
        uri: album.uri,
        image: album.images[0]?.url,
        title: album.name,
        subtitle: `${album.release_date.slice(0, 4)} • ${
          album.artists[0].name
        }`,
        type: "album",
      }))}
      playMode="context"
    />
  );
};

export default AlbumsResults;
