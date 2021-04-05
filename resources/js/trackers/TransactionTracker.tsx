import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import useEcho from "../hooks/useEcho";
import useMatch from "../hooks/useMatch";

export default function () {
    const dispatch = useDispatch();
    const match = useMatch();

    useEffect(() => {
        if (match)
            dispatch.transactions.getByMatchId(match.id);
    }, [match?.id]);

    useEcho(match ? `match-${match.id}` : null, 'TransactionCreated', (e) => {
        // @ts-ignore
        dispatch.transactions.add(e.transaction);
    }, true);

    return null;
}
