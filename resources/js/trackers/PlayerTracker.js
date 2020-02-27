import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import useEcho from "../hooks/useEcho";
import useMatch from "../hooks/useMatch";

export default function PlayerTracker() {
    const dispatch = useDispatch();
    const match = useMatch();

    useEffect(() => {
        if(match)
            dispatch.players.get(match.id);
    }, [match ? match.id : null]);

    useEcho(match ? `match-${match.id}` : null, 'PlayerJoined', (e) => {
        dispatch.players.add(e.user);
    }, true);

    useEcho(match ? `match-${match.id}` : null, 'PlayerLeft', (e) => {
        dispatch.players.remove(e.user);
    }, true);

    useEcho('users', 'UserUpdated', (e) => {
        dispatch.players.update(e.user);
    }, true);

    return null;
}
