import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store';
import Match from "./Match";
import MatchTracker from "../trackers/MatchTracker";
import PlayerTracker from "../trackers/PlayerTracker";

ReactDOM.render(
    <Provider store={store}>
        <MatchTracker/>
        <PlayerTracker/>

        <Match/>
    </Provider>
    , document.getElementById('container'));
