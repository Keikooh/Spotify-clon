import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function ResultsNavbar() {
  const [option, setoption] = useState("all");
  const { query } = useParams();

  const filter = {
    all: `/home/search/${encodeURI(query)}`,
    songs: `/home/search/${encodeURI(query)}/tracks`,
    playlists: `/home/search/${encodeURI(query)}/playlists`,
    artists: `/home/search/${encodeURI(query)}/artists`,
    podcasts: `/home/search/${encodeURI(query)}/shows`,
  };

  return (
    <nav className="z-10 sticky top-0 w-full flex gap-2 bg-gray-950 pb-4">
      {Object.entries(filter).map(([key, value]) => (
        <Link
          to={value}
          className={`text-sm px-4 py-2  font-semibold rounded-full ${
            option === key
              ? "bg-white text-gray-950"
              : "bg-gray-900 hover:bg-gray-700"
          }`}
          onClick={() => setoption(key)}
        >
          {`${key[0].toUpperCase()}${key.slice(1)}`}
        </Link>
      ))}
    </nav>
  );
}

export default ResultsNavbar;
