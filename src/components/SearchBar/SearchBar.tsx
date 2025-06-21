import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getSearchResult } from './SearchBar.service';
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";

function SearchBar() {
  const accessToken: string | null = localStorage.getItem("access_token");
  const [value, setvalue] = useState("");
  const debounceValue = useDebounce(value, 500);

  const navigate = useNavigate();

  const handleChange = ( e ) => {
    setvalue( e )
  };

  useEffect(() => {
    
    if( value !== "" ){
      const fetchTrack = async() => {
      const result = await getSearchResult(accessToken, debounceValue);

      if( result.error){
        const status = result.error.status;
        if( status === 401 ){
          navigate("/");
        }
      }
      navigate("/home/search", {
        state: { result, debounceValue },
      })
    }
    fetchTrack();
    }
  }, [debounceValue])
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
        <IoSearch className="text-2xl" />
      </div>
      <input
        className="block w-90 rounded-full p-2 ps-12 dark:bg-gray-900 dark:focus:ring-blue-500 focus:border-2"
        onChange={(e) => handleChange(e.target.value)}
        placeholder="What do you want to play?"
      />
    </div>
  );
}

export default SearchBar;
