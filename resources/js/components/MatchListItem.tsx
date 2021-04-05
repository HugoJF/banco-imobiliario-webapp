import React from 'react';
import {Activity, Clock, Users} from "react-feather";
import {MatchType} from "../types";
import {Stat} from "./ui/Stat";
import {HorizontalButton} from "./ui/HorizontalButton";

export type MatchListItemProps = {
    match: MatchType;
}

export const MatchListItem: React.FC<MatchListItemProps> = ({match}) => {
    return <HorizontalButton locked={Boolean(match.started_at)}>
        {/* Match ID */}
        <h2 className="text-3xl text-black font-bold tracking-tight">
            #{match.id}
        </h2>

        {/* User count */}
        <Stat icon={Users}>
            {match.users.length}
        </Stat>

        {/* Match rounds */}
        <Stat icon={Activity}>
            {match.rounds}
        </Stat>

        {/* Match duration FIXME: parse */}
        <Stat icon={Clock}>
            {match.created_at}
        </Stat>
    </HorizontalButton>
};
