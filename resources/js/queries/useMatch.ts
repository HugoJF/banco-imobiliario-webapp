import {useQuery} from "react-query";
import {api} from "../api";
import {Id} from "../types";

export function useMatch(id: Id) {
    return useQuery(
        ['match', id],
        () => api.matches.show(id),
    )
}
