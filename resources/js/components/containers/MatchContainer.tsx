import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import useAsync from "../../hooks/useAsync";
import useMatch from "../../hooks/useMatch";
import MatchJoinContainer from "./MatchJoinContainer";
import MatchStartedContainer from "./MatchStartedContainer";
import MatchEndedContainer from "./MatchEndedContainer";
import MatchConfiguration from "./MatchConfigurationContainer";
import MatchLoadingContainer from "./MatchLoadingContainer";

export default function MatchContainer() {
    const dispatch = useDispatch();
    const match = useMatch();
    const [loading, setLoading] = useState(true);

    // If this component is rendered a second time, setLoading will lose its reference!
    useAsync(async () => {
        await Promise.all([
            dispatch.me.get(),
            dispatch.match.search(),
        ]);

        setLoading(false);
    });

    if (loading) {
        return <MatchLoadingContainer/>
    }

    if (!match) {
        return <MatchJoinContainer/>;
    }

    if (match.ended_at) {
        return <MatchEndedContainer/>;
    }

    if (match.started_at) {
        return <MatchStartedContainer/>
    }

    return <MatchConfiguration/>
}
