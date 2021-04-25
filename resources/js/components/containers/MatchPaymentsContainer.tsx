import React from 'react';
import {useParams} from "react-router";
import {MatchView} from "../MatchView";
import {useMatch} from "../../queries/useMatch";
import {Loader} from "react-feather";
import {MatchConfig} from "../MatchConfig";
import {useMatchBalances} from "../../queries/useMatchBalances";
import {MatchBalances} from "./MatchBalances";
import {MatchPayments} from "../MatchPayments";

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
