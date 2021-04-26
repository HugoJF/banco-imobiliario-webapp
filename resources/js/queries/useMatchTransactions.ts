import {useQuery} from "react-query";
import {api} from "../api";
import {Id} from "../types";

export function useMatchTransactions(id: Id, page: number) {
    return useQuery(
        ['match', id, 'transactions', page],
        () => api.matches.transactions(id, page)
    )
}
