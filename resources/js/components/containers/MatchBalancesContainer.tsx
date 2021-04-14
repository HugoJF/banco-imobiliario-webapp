import React from 'react';
import {useParams} from "react-router";
import {MatchView} from "../MatchView";
import {useMatch} from "../../queries/useMatch";
import {Loader} from "react-feather";
import {MatchConfig} from "../MatchConfig";
import {useMatchBalances} from "../../queries/useMatchBalances";
import {MatchBalances} from "./MatchBalances";

export const MatchBalancesContainer: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const match = useMatch(id);
    const balances = useMatchBalances(id);

    if (!match.data || !balances.data) {
        return <Loader/>;
    }

    return <MatchBalances
        match={match.data.data}
        balances={balances.data.data}
    />
};
