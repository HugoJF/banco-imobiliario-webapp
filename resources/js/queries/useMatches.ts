import {useQuery} from "react-query";
import {api} from "../api";

export function useMatches() {
     return useQuery(
        ['matches'],
        api.matches.index
    )
}
