import React from 'react';
import {useParams} from "react-router";
import {MatchView} from "../pages/MatchView";
import {useMatch} from "../../queries/useMatch";
import {Loader} from "react-feather";
import {MatchConfig} from "../pages/MatchConfig";
import {useMatchBalances} from "../../queries/useMatchBalances";
import {MatchBalances} from "../pages/MatchBalances";
import {MatchPayments} from "../pages/MatchPayments";

export const MatchPaymentsContainer: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const match = useMatch(id);
    const balances = useMatchBalances(id);

    if (!balances.data || !match.data) {
        return <Loader/>;
    }

    return <MatchPayments
        match={match.data.data.data}
        balances={balances.data.data}
    />
};
