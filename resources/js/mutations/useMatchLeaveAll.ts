import {useMutation, useQueryClient} from "react-query";
import {api} from "../api";
import {MatchProperties} from "../types";

export function useMatchLeaveAll() {
    const queryClient = useQueryClient();

    return useMutation(
        api.matches.leaveAll,
        {
            onSuccess: () => {
                queryClient.invalidateQueries()
            }
        }
    )
}
