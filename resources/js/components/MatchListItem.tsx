import React from 'react';
import {Activity, Clock, DollarSign, Users} from "react-feather";
import {MatchType} from "../types";
import {Stat} from "./ui/Stat";
import {HorizontalButton} from "./ui/HorizontalButton";
import {formatDistanceToNow, parseISO} from "date-fns";
import {formatNumber} from "./helpers/helpers";

export type MatchListItemProps = {
    match: MatchType;
    onClick?: (match: MatchType) => void;
}

export const MatchListItem: React.FC<MatchListItemProps> = ({match, onClick}) => {
    const createdAt = parseISO(match.created_at);
    const interval = formatDistanceToNow(createdAt, {addSuffix: true});

    return <HorizontalButton
        locked={Boolean(match.started_at)}
        onClick={() => onClick && onClick(match)}
    >
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
            {match.turn}
        </Stat>

        {/* Initial money */}
        <Stat icon={DollarSign}>
            {formatNumber(match.starting_money).join('')}
        </Stat>

        {/* Match duration */}
        <Stat icon={Clock}>
            {interval}
        </Stat>
    </HorizontalButton>
};
