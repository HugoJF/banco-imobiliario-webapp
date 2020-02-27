import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import useAsync from "../hooks/useAsync";
import MatchJoin from "./MatchJoin";
import MatchSummary from "./MatchSummary";
import useMatch from "../hooks/useMatch";
import Loading from "./ui/Loading";
import MatchPanel from "./MatchPanel";

export default function Match({children}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const match = useMatch();

    // TODO: if this component is rendered a second time, setLoading will lose its reference!
    useAsync(async () => {
        await dispatch.me.get();
        await dispatch.match.search();
        setLoading(false);
    });

    if (loading) {
        return <Loading>Verificando se você já está em uma partida...</Loading>
    }

    if (!match) {
        return <MatchJoin/>;
    }

    if (match.ended_at) {
        return <p>partida finalizada</p>;
    }

    if (match.started_at) {
        return <MatchPanel/>
    }

    return <MatchSummary/>
}
