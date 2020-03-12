import React from 'react';
import {Router} from "@reach/router";
import MatchConfiguration from "../MatchConfiguration";
import MatchInitialMoney from "../MatchInitialMoney";

export default function () {
    return <Router>
        <MatchConfiguration path="/"/>
        <MatchInitialMoney path="dinheiro-inicial"/>
    </Router>
}
