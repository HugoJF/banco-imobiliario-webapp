import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";
import {Id} from "../types";
import {TransactionRequest} from "../types/match";

export function useMatchTransaction(id: Id) {
    const queryClient = useQueryClient();

    return useMutation(
        (data: TransactionRequest) => api.matches.transaction(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
