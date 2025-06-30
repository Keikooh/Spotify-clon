import { createContext, useContext} from "react";

export const ResultsContext = createContext(null);

export const useResults = () => {
    return useContext(ResultsContext)
}