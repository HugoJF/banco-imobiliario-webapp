import React from 'react';
import {useDispatch} from "react-redux";
import useEcho from "../hooks/useEcho";
import useMatch from "../hooks/useMatch";

export default function MatchTracker() {
    const dispatch = useDispatch();
    const match = useMatch();

    useEcho(match ? `match-${match.id}` : null, 'MatchUpdated', (e) => {
        dispatch.match.set(e.match);
    }, true);

    return null;
}
