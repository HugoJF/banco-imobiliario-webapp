import React from 'react';
import {Router} from "@reach/router";
import usePlayers from "../../hooks/usePlayers";
import MatchActionPanel from "../MatchActionPanel";
import Receive200k from "../Receive200k";
import Pay from "../Pay";
import MatchEnd from "../MatchEnd";
import Loading from "../ui/Loading";
import Transactions from "../Transactions";

export default function () {
    const players = usePlayers();

    if (!players) {
        return <Loading>Carregando jogadores...</Loading>;
    }

    return <Router>
        <MatchActionPanel path="/"/>

        <Pay path="pagar"/>
        <Receive200k path="receber"/>
        <Transactions path="transacoes"/>

        <MatchEnd path="finalizar"/>
    </Router>
}
