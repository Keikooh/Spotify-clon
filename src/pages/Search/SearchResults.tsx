import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Track from "../../components/Track/Track";
import ResultSection from "../../components/ResultSection";
import PlayButton from "../../components/Buttons/PlayButton";
import ResultsNavbar from "../../components/partials/ResultsNavbar";

const SearchResults = () => {
  return (
    <div className=" h-full overflow-y-auto">
      <ResultsNavbar />
      <Outlet />
    </div>
  );
};

export default SearchResults;
