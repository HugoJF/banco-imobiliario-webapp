import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import useEcho from "../hooks/useEcho";

export default function MatchTracker() {
    const dispatch = useDispatch();
    const match = useSelector(state => state.match);

    useEcho(`match-${match.id}`, 'MatchUpdated', (e) => {
        dispatch.match.set(e.match);
    }, true);

    return null;
}
