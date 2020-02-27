import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store';
import Match from "./Match";
import MatchTracker from "../trackers/MatchTracker";
import PlayerTracker from "../trackers/PlayerTracker";
import BalanceTracker from "../trackers/BalanceTracker";

ReactDOM.render(
    <Provider store={store}>
        <MatchTracker/>
        <PlayerTracker/>
        <BalanceTracker/>

        <Match/>
    </Provider>
    , document.getElementById('container'));
