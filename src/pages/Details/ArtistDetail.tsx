import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailView from "../../components/details/DetailView"
import { getArtist, getArtistTopTrack } from "../../services/artistServices";
import { formatNumber } from "../../utils/formats";

const ArtistDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState({
    name: "",
    image: "",
    uri: "",
    followers: 0,
    topTracks: [],
  });

  useEffect(() => {
    const fetchArtist = async () => {
      const data = await getArtist(id);
      const topTracks = await getArtistTopTrack(id);

      if (data && topTracks) {
        setArtist({
          name: data.name,
          image: data.images[0]?.url,
          uri: data.uri,
          followers: data.followers.total,
          topTracks: topTracks.tracks.map((track) => ({
            uri: data.uri,
            image: track.album.images[0].url,
            name: track.name,
            artists: track.artists.map((artist) => artist.name).join(", "),
            plays: 0,
            duration: track.duration_ms
          })),
        });

        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) return <p>Cargando...</p>;

  return (
    <DetailView
      type="artist"
      uri={artist.uri}
      headerData={{
        image: artist.image,
        title: artist.name,
        subtitle: "Verified artist",
        description: `${formatNumber(artist.followers.toString())} followers`,
      }}
      itemsList={artist.topTracks}
      isOwner={false}
    />
  );
};

export default ArtistDetail;
