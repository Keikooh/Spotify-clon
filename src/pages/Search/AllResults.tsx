import ResultSection from "../../components/ResultSection";
import PlayButton from "../../components/Buttons/PlayButton";
import { useEffect, useState } from "react";
import { getSearchResult } from "../../services/SpotifyServices";
import { useParams } from "react-router-dom";
import Track from "../../components/Track/Track";

const filterResult = (data) => {
  return data.filter((item) => item !== null && item.images).slice(0,5);
};

const AllResults = () => {
  const { query } = useParams();
  const accessToken: string | null = localStorage.getItem("access_token");
  const [filtered, setfiltered] = useState({
    tracks: [],
    artists: [],
    albums: [],
    playlists: [],
    podcasts: [],
  });
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearchResult(accessToken, query, "album,track,playlist,artist,show");

      if (data) {
        const { tracks, artists, playlists, albums, shows: podcasts } = data;
        setfiltered({
          tracks: filterResult(tracks.items),
          artists: filterResult(artists.items),
          albums: filterResult(albums.items),
          playlists: filterResult(playlists.items),
          podcasts: filterResult(podcasts.items),
        });

        setloading(false);

      }
    };
    fetchData();
  }, [query]);

  if (loading) return <p>Cargando elementos...</p>;

  return (
    <div className="flex flex-col gap-y-10  mt-10">
      {/* <div className="flex "> */}
        {/* Top result */}
        {/* <div className="p-2 w-1/3 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">Top result</h2>
          <div className="group relative p-5 bg-gray-900 hover:bg-gray-700 transition duration-150 rounded-lg h-full cursor-pointer">
            <img className="size-24 rounded-lg mb-3 shadow-2xl" src={""} />
            <p className="font-bold text-3xl">Ariana Grande</p>
            <p className="opacity-70">Singer</p>
            <PlayButton
              uri={filtered.tracks[0].uri}
              playMode="single"
              variant="floating"
              isArtist={false}
              styles="size-12 absolute hidden group-hover:flex bottom-4 right-4"
            />
          </div>
        </div> */}
        {/* Tracks */}
        {/* <div className="p-2 w-2/3 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">Songs</h2>
          <ul className="">
            {filtered.tracks.slice(0, 4).map((track: any) => (
              <Track key={track.id} data={track} />
            ))}
          </ul>
        </div>
      </div> */}

      <ResultSection
        title="Artists"
        wrap={false}
        itemList={filtered.artists.map((artist) => ({
          id: artist.id,
          uri: artist.uri,
          image: artist.images[0]?.url,
          title: artist.name,
          subtitle: "Artist",
          type: "artist",
        }))}
        path="artist"
        playMode="context"
      />

      <ResultSection
        title="Albums"
        wrap={false}
        itemList={filtered.albums.map((album) => ({
          id: album.id,
          uri: album.uri,
          image: album.images[0]?.url,
          title: album.name,
          subtitle: `${album.release_date.slice(0, 4)} • ${
            album.artists[0].name
          }`,
          type: "album",
        }))}
        path="album"
        playMode="context"
      />

      <ResultSection
        title="Playlists"
        wrap={false}
        itemList={filtered.playlists.map((playlist) => ({
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

      <ResultSection
        title="Podcasts"
        wrap={false}
        itemList={filtered.podcasts.map((podcast) => ({
          id: podcast.id,
          uri: podcast.uri,
          image: podcast.images[0].url,
          title: podcast.name,
          subtitle: podcast.publisher,
          type: "podcast",
        }))}
        path="show"
      />
    </div>
  );
};

export default AllResults;
