import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";
import {MatchProperties} from "../types";

export function useMatchLeave() {
    const queryClient = useQueryClient();

    return useMutation(
        api.matches.leave,
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
