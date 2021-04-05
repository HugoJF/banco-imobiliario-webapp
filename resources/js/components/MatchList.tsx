import React from 'react';
import {MatchListItem} from "./MatchListItem";
import {MatchType} from "../types";

export type MatchListProps = {
    matches: MatchType[];
}

export const MatchList: React.FC<MatchListProps> = ({matches}) => {
    return <div className="mt-8 space-y-4">
        {matches.map(match => <MatchListItem match={match}/>)}
    </div>
};
