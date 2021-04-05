import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from "./store";
import {UserSelectionContainer} from "./components/containers/UserSelectionContainer";
import {MatchSelectionContainer} from "./components/containers/MatchSelectionContainer";
import {MatchConfigContainer} from "./components/containers/MatchConfigContainer";
import {MatchContainer} from "./components/containers/MatchContainer";

ReactDOM.render(
    <Provider store={store}>
        {/*<MatchTracker/>*/}
        {/*<PlayerTracker/>*/}
        {/*<BalanceTracker/>*/}
        {/*<TransactionTracker/>*/}

        <MatchContainer
            match={{
                id: 'jd2',
                users: [{id: 1, name: 'Ronald', matches: 2, email: 'asd@asd.com'}],
                updated_at: 'asd',
                created_at: 'as',
                started_at: 'asd',
                rounds: 20,
            }}
        />
        <MatchConfigContainer/>
        <UserSelectionContainer/>
        <MatchSelectionContainer/>

    </Provider>
    , document.getElementById('container'));
