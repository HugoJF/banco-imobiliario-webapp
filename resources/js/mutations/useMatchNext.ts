import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";
import {MatchProperties} from "../types";

export function useMatchNext() {
    const queryClient = useQueryClient();

    return useMutation(
        api.matches.next,
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
