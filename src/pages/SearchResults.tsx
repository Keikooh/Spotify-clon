import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Track from "../components/Track/Track";
import ResultSection from "../components/ResultSection";
import PlayButton from "../components/Buttons/PlayButton";

type props = {
  image: string;
  title: string;
  subtitle: string;
};
const SearchResults = () => {
  const location = useLocation();
  const result = location.state?.result;
  const value = location.state?.debounceValue;
  const [topResult, settopResult] = useState({});

  const tracks = result?.tracks.items.filter((item) => item != null);
  const artists = result?.artists.items
    .filter((artist) => artist != null)
    .slice(0, 5);
  const albums = result?.albums.items
    .filter((item) => item != null)
    .slice(0, 5);
  const playlists = result?.playlists.items
    .filter((item) => item != null)
    .slice(0, 5);
  const podcasts = result?.shows.items
    .filter((item) => item != null)
    .slice(0, 5);

  // useEffect(() => {
  //   if(tracks[0].name.toLowerCase().includes(value.toLowerCase())){
  //     settopResult({
  //       image: tracks[0].images[0].url,
  //       title: tracks[0].name,
  //       subtitle: `Song • ${tracks[0].artists.map((artist) => artist.name).join(", ")}`,
  //     });
  //   }
  //   if (artists[0].name.toLowerCase().includes(value.toLowerCase())) {
  //     settopResult({
  //       image: artists[0].images[0].url,
  //       title: artists[0].name,
  //       subtitle: "Artist",
  //     });
  //   }
    
  // }, []);

  // Artist

  if (!tracks) {
    return <p className=" p-4">No hay resultados disponibles</p>;
  }

  return (
    <div className=" h-full overflow-y-auto">
      <div className="z-10 sticky top-0 w-full flex gap-2 bg-gray-950 pb-4">
        <button className="text-sm px-4 py-2 font-semibold rounded-full bg-white text-gray-950">
          All
        </button>
        <button className="text-sm px-4 py-2 font-semibold rounded-full bg-gray-900">
          Songs
        </button>
        <button className="text-sm px-4 py-2 font-semibold rounded-full bg-gray-900">
          Albums
        </button>
        <button className="text-sm px-4 py-2 font-semibold rounded-full bg-gray-900">
          Artists
        </button>
        <button className="text-sm px-4 py-2 font-semibold rounded-full bg-gray-900">
          Playlists
        </button>
        <button className="text-sm px-4 py-2 font-semibold rounded-full bg-gray-900">
          Podcasts
        </button>
      </div>
      <div className="flex flex-col gap-y-10  mt-10">
        <div className="flex ">
          {/* Top result */}
          <div className="p-2 w-1/3 flex flex-col gap-2">
            <h2 className="font-bold text-2xl">Top result</h2>
            <div className="group relative p-5 bg-gray-900 hover:bg-gray-700 transition duration-150 rounded-lg h-full cursor-pointer">
              <img className="size-24 rounded-lg mb-3 shadow-2xl" src={tracks[0].album.images[0].url} />
              <p className="font-bold text-3xl">Ariana Grande</p>
              <p className="opacity-70">Singer</p>
              <PlayButton 
                uri={tracks[0].uri}
                playMode="single"
                variant="floating"
                isArtist={false}
                styles="size-12 absolute hidden group-hover:flex bottom-4 right-4"
              />
            </div>
          </div>
          {/* Tracks */}
          <div className="p-2 w-2/3 flex flex-col gap-2">
            <h2 className="font-bold text-2xl">Songs</h2>
            <ul className="">
              {tracks.slice(0, 4).map((track: any) => (
                <Track key={track.id} data={track} />
              ))}
            </ul>
          </div>
        </div>

        <ResultSection
          title="Artists"
          itemList={artists.map((artist) => ({
            id: artist.id,
            uri: artist.uri,
            image: artist.images[0].url,
            title: artist.name,
            subtitle: "Artist",
            type: "artist",
          }))}
          playMode="context"
        />

        <ResultSection
          title="Albums"
          itemList={albums.map((album) => ({
            id: album.id,
            uri: album.uri,
            image: album.images[0].url,
            title: album.name,
            subtitle: `${album.release_date.slice(0, 4)} • ${
              album.artists[0].name
            }`,
            type: "album",
          }))}
          playMode="context"
        />

        <ResultSection
          title="Playlists"
          itemList={playlists.map((playlist) => ({
            id: playlist.id,
            uri: playlist.uri,
            image: playlist.images[0].url,
            title: playlist.name,
            subtitle: `By ${playlist.owner.display_name}`,
            type: "album",
          }))}
          playMode="context"
        />

        <ResultSection
          title="Podcasts"
          itemList={podcasts.map((podcast) => ({
            id: podcast.id,
            uri: podcast.uri,
            image: podcast.images[0].url,
            title: podcast.name,
            subtitle: podcast.publisher,
            type: "podcast",
          }))}
        />
      </div>
    </div>
  );
};

export default SearchResults;
