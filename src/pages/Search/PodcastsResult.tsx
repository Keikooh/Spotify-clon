import  { useEffect, useState } from "react";
import ResultSection from "../../components/ResultSection";
import { useParams } from "react-router-dom";
import { getSearchResult } from "../../services/SpotifyServices";

const PodcastsResult = () => {
  const { query } = useParams();
  const accessToken = localStorage.getItem("access_token");
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setloading] = useState(true);

  const filterResult = (data) => {
    return data.filter((item) => item !== null && item.images);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearchResult(accessToken, query, "show");
      if (data) {
        const { shows } = data;
        setPodcasts(filterResult(shows.items));
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
      itemList={podcasts.map((podcast) => ({
        id: podcast.id,
        uri: podcast.uri,
        image: podcast.images[0].url,
        title: podcast.name,
        subtitle: podcast.publisher,
        type: "podcast",
      }))}
    />
  );
};

export default PodcastsResult;
