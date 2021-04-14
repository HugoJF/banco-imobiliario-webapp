import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";
import {MatchProperties} from "../types";

export function useMatchJoin() {
    const queryClient = useQueryClient();

    return useMutation(
        api.matches.join,
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
