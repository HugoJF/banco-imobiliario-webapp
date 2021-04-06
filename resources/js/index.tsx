import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from "./store";
import {UserSelectionContainer} from "./components/containers/UserSelectionContainer";
import {MatchSelectionContainer} from "./components/containers/MatchSelectionContainer";
import {MatchConfigContainer} from "./components/containers/MatchConfigContainer";
import {MatchContainer} from "./components/containers/MatchContainer";
import {BrowserRouter as Router, Redirect} from "react-router-dom";
import {Route, Switch} from "react-router";
import {QueryClient, QueryClientProvider} from "react-query";


// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {/*<MatchTracker/>*/}
                {/*<PlayerTracker/>*/}
                {/*<BalanceTracker/>*/}
                {/*<TransactionTracker/>*/}

                <Switch>
                    <Route path="/users" children={<UserSelectionContainer/>}/>
                    <Route path="/matches" children={<MatchSelectionContainer/>}/>
                    <Route path="/match/:id/config" children={<MatchConfigContainer/>}/>
                    <Route
                        path="/match/:id" children={<MatchContainer
                        match={{
                            id: 'jd2',
                            users: [{id: 1, name: 'Ronald', matches: 2, email: 'asd@asd.com'}],
                            updated_at: 'asd',
                            created_at: 'as',
                            started_at: 'asd',
                            rounds: 20,
                        }}
                    />}
                    />

                    <Redirect to="/users"/>
                </Switch>
            </Provider>
        </QueryClientProvider>
    </Router>
    , document.getElementById('container'));
