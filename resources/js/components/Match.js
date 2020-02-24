import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import useAsync from "../hooks/useAsync";
import MatchJoin from "./MatchJoin";
import MatchSummary from "./MatchSummary";

export default function Match({children}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const match = useSelector(state => state.match);

    // TODO: if this component is rendered a second time, setLoading will lose its reference!
    useAsync(async () => {
        await dispatch.match.search();
        setLoading(false);
    });

    if (loading) {
        return <p>Verificando se você já está em uma partida...</p>
    }

    if (!match) {
        return <MatchJoin/>;
    }

    if (match.ended_at) {
        return <p>partida finalizada</p>;
    }

    if (match.started_at) {
        return <p>partida iniciada</p>
    }

    return <>
        {children}
        <MatchSummary/>
    </>
}
