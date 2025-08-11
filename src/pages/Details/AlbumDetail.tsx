import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbum } from "../../services/albumServices";
import DetailView from "@components/DetailView";

const AlbumDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState({
    name: "",
    image: "",
    owner: "",
    uri: "",
    tracks: [],
  });

  useEffect(() => {
    const getPlaylist = async () => {
      const data = await getAlbum(id);

      if (data) {
        setAlbum({
          name: data.name,
          image: data.images[0]?.url,
          owner: data.artists.map((artist) => artist.name).join(", "),
          uri: data.uri,
          tracks: data.tracks.items.map((track) => ({
            uri: data.uri,
            image: "",
            name: track.name,
            artists: track.artists.map((artist) => artist.name).join(", "),
            plays: 0,
            duration: track.duration_ms,
          })),
        });
        setLoading(false);
      }
    };

    getPlaylist();
  }, [id]);

  if (loading) return <p>Cargando...</p>;

  return (
    <DetailView
      type="album"
      uri={album.uri}
      headerData={{
        image: album.image,
        title: album.name,
        subtitle: "Public album",
        description: `${album.owner} ${album.tracks.length} songs`,
      }}
      itemsList={album.tracks}
      isOwner={false}
    />
  );
};

export default AlbumDetail;
