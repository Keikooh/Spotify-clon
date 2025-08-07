
import { Outlet } from "react-router-dom";
import ResultsNavbar from "../../components/partials/ResultsNavbar";

const SearchResults = () => {
  return (
    <div className=" h-full overflow-y-auto scroll">
      <ResultsNavbar />
      <Outlet />
    </div>
  );
};

export default SearchResults;
