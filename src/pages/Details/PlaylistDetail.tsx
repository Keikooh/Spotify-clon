import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// services
import { fetchPlaylist } from "../../services/SpotifyServices";

// icons
import DetailView from "../../components/details/DetailView";

const PlaylistDetail = () => {
  const { id } = useParams();
  const accessToken = localStorage.getItem("access_token");
  const [playlist, setplaylist] = useState(null);

  useEffect(() => {
    const getPlaylist = async (id) => {
      const data = await fetchPlaylist(accessToken, id);

      if (data) {
        setplaylist(data);
        console.log(data);
      }
    };

    getPlaylist(id);
  }, [id, accessToken]);

  if (playlist) {
    return (
      <DetailView
        type="playlist"
        uri={playlist.uri}
        headerData={{
          image:  playlist.images ? playlist.images[0]?.url : "" ,
          title: playlist.name,
          subtitle: "Public playlist",
          description: `${playlist.owner.display_name} ${playlist.tracks.items.length} songs`,
        }}
        itemsList={playlist.tracks.items?.map((item) => ({
          uri: playlist.uri,
          image: item.track.album.images[0].url,
          name: item.track.name,
          artists: item.track.artists.map((artist) => artist.name).join(", "),
          duration: item.track.duration_ms,
          albumName: item.track.album.name,
          addedAt: item.added_at,
        }))}
        isEditable={true}
      />
    );
  } else {
    return <p>Cargando</p>;
  }
};

export default PlaylistDetail;
