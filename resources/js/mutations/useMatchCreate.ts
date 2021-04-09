import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";
import {MatchProperties} from "../types";

export function useMatchCreate() {
    const queryClient = useQueryClient();

    return useMutation(
        (data: MatchProperties) => api.matches.store(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
