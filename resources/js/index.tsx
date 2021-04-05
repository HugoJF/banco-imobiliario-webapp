import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import PlayerTracker from "./trackers/PlayerTracker";
import MatchContainer from "./components/containers/MatchContainer";
import MatchTracker from "./trackers/MatchTracker";
import TransactionTracker from "./trackers/TransactionTracker";
import BalanceTracker from "./trackers/BalanceTracker";
import {store} from "./store";

ReactDOM.render(
    <Provider store={store}>
        <MatchTracker/>
        <PlayerTracker/>
        <BalanceTracker/>
        <TransactionTracker/>

        <MatchContainer/>
        </Provider>
    , document.getElementById('container'));
