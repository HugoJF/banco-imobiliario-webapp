import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";
import {Id} from "../types";
import {TransactionRequest} from "../types/match";

export function useTransactionCancel() {
    const queryClient = useQueryClient();

    return useMutation(
        (id: Id) => api.transactions.cancel(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
