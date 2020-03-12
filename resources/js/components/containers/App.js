import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import MatchContainer from "./MatchContainer";
import MatchTracker from "../../trackers/MatchTracker";
import PlayerTracker from "../../trackers/PlayerTracker";
import BalanceTracker from "../../trackers/BalanceTracker";
import TransactionTracker from "../../trackers/TransactionTracker";

ReactDOM.render(
    <Provider store={store}>
        <MatchTracker/>
        <PlayerTracker/>
        <BalanceTracker/>
        <TransactionTracker/>

        <MatchContainer/>
    </Provider>
    , document.getElementById('container'));
