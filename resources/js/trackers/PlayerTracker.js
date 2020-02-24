import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import useEcho from "../hooks/useEcho";

export default function PlayerTracker() {
    const dispatch = useDispatch();
    const match = useSelector(state => state.match);

    useEffect(() => {
        dispatch.players.get(match.id);
    }, []);

    useEcho(`match-${match.id}`, 'PlayerJoined', (e) => {
        dispatch.players.add(e.user);
    }, true);

    useEcho(`match-${match.id}`, 'PlayerLeft', (e) => {
        dispatch.players.remove(e.user);
    }, true);

    return null;
}
