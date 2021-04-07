import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from "./store";
import {BrowserRouter as Router} from "react-router-dom";
import {hot, setConfig} from "react-hot-loader";
import {QueryClient, QueryClientProvider} from "react-query";
import {Root} from "./routes/root";

const isProduction = process.env.MIX_APP_ENV === 'production';

// Create a client
const queryClient = new QueryClient();

if (!isProduction) {
    setConfig({reloadHooks: false});
}

const WrappedRoot = hot(module)(Root);

ReactDOM.render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {/*<MatchTracker/>*/}
                {/*<PlayerTracker/>*/}
                {/*<BalanceTracker/>*/}
                {/*<TransactionTracker/>*/}
                <WrappedRoot/>
            </Provider>
        </QueryClientProvider>
    </Router>
    , document.getElementById('container')
);
