import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// services
import { getPlaylist } from "../../services/playlistServices";

// icons
import DetailView from "../../components/details/DetailView";

const PlaylistDetail = () => {
  const { id } = useParams();
  const [playlist, setplaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async (id) => {
      const data = await getPlaylist(id);

      if (data) {
        setplaylist(data);
        console.log(data);
      }
    };

    fetchPlaylist(id);
  }, [id]);

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
