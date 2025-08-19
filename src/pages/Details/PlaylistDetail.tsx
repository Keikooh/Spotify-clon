import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Types
import type { Playlist } from "../../interfaces/playlists";
// Services
import { getPlaylist } from "@services/playlistServices";
// Components
import DetailView from "@components/DetailView";
import { getCoverImage } from '../../utils/images';

const PlaylistDetail = () => {
  const { id } = useParams();
  const [playlist, setplaylist] = useState<Playlist>();

  const fetchPlaylist = async () => {
    const data = await getPlaylist(id!);

    if (data) {
      setplaylist(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  if (playlist) {
    const {
      uri,
      name,
      description,
      images,
      owner: { display_name },
      tracks: {
        items: { length },
      },
    } = playlist;

    const isEditable = playlist.owner.id === localStorage.getItem("user_id") ? true : false;

    return (
      <DetailView
        onUpdated={fetchPlaylist}
        isEditable={isEditable}
        type="playlist"
        uri={uri}
        headerData={{
          image: getCoverImage(images),
          title: name,
          description: description,
          subtitle: `${display_name} ${length} songs`,
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
      />
    );
  } else {
    return <p>Loading ...</p>;
  }
};

export default PlaylistDetail;
