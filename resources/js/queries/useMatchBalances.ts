import {useQuery} from "react-query";
import {api} from "../api";
import {Id} from "../types";

export function useMatchBalances(id: Id) {
    return useQuery(
        ['match', id, 'balances'],
        () => api.matches.balances(id),
    )
}
