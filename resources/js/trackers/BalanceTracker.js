import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import useEcho from "../hooks/useEcho";
import useMatch from "../hooks/useMatch";

export default function () {
    const dispatch = useDispatch();
    const match = useMatch();

    useEffect(() => {
        if (match)
            dispatch.balances.get(match.id);
    }, [match ? match.id : null]);

    useEcho(match ? `match-${match.id}` : null, 'BalanceUpdated', (e) => {
        dispatch.balances.update(e.balances);
    }, true);

    return null;
}
