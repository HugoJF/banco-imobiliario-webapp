import React from 'react';
import {MatchListItem} from "./MatchListItem";
import {MatchType} from "../types";

export type MatchListProps = {
    matches: MatchType[];
    onClick?: (match: MatchType) => void;
}

export const MatchList: React.FC<MatchListProps> = ({matches, onClick}) => {
    return <div className="space-y-4">
        {matches.map(match => <MatchListItem
            key={match.id}
            match={match}
            onClick={onClick}
        />)}
    </div>
};
