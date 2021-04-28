import React from 'react';
import {useParams} from "react-router";
import {MatchView} from "../pages/MatchView";
import {useMatch} from "../../queries/useMatch";
import {Loader} from "react-feather";
import {MatchConfig} from "../pages/MatchConfig";
import {useMatchBalances} from "../../queries/useMatchBalances";
import {MatchBalances} from "../pages/MatchBalances";

export const MatchBalancesContainer: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const match = useMatch(id);
    const balances = useMatchBalances(id);

    if (!match.data || !balances.data) {
        return <Loader/>;
    }

    return <MatchBalances
        match={match.data.data.data}
        balances={balances.data.data}
    />
};
