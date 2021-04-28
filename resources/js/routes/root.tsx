import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {Route, Switch} from "react-router";
import {AuthedRoute} from "../components/containers/AuthedRoute";
import {LoginContainer} from "../components/containers/LoginContainer";
import {MatchViewContainer} from "../components/containers/MatchViewContainer";
import {MatchConfigContainer} from "../components/containers/MatchConfigContainer";
import {MatchSelectionContainer} from "../components/containers/MatchSelectionContainer";
import {useDispatch} from "react-redux";
import {Dispatch} from "../store";
import {MatchCreateContainer} from "../components/containers/MatchCreationContainer";
import {HeaderContainer} from "../components/containers/HeaderContainer";
import {MatchBalancesContainer} from "../components/containers/MatchBalancesContainer";
import {PageLoader} from "../components/ui/PageLoader";
import {UserRegistrationContainer} from "../components/containers/UserRegistrationContainer";
import {MatchPaymentsContainer} from "../components/containers/MatchPaymentsContainer";
import {MatchTransactionsContainer} from "../components/containers/MatchTransactionsContainer";

export const Root = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        (async () => {
            await dispatch.auth.me();
            setLoaded(true);
        })()
    }, []);

    if (!loaded) {
        return <PageLoader loading={true}/>
    }

    return <>
        <HeaderContainer/>
        <main className="pt-4 pb-8 relative mx-auto container">
            <Switch>
                <Redirect exact path="/" to="/login"/>
                <Route path="/login" children={<LoginContainer/>}/>
                <Route path="/register" children={<UserRegistrationContainer/>}/>

                <Redirect path="/home" to="/matches"/>
                <AuthedRoute path="/matches/create" children={<MatchCreateContainer/>}/>
                <AuthedRoute path="/matches" children={<MatchSelectionContainer/>}/>
                <AuthedRoute path="/match/:id/config" children={<MatchConfigContainer/>}/>
                <AuthedRoute path="/match/:id/balances" children={<MatchBalancesContainer/>}/>
                <AuthedRoute path="/match/:id/payments" children={<MatchPaymentsContainer/>}/>
                <AuthedRoute path="/match/:id/transactions" children={<MatchTransactionsContainer/>}/>
                <AuthedRoute path="/match/:id" children={<MatchViewContainer/>}/>

                <Redirect to="/home"/>
            </Switch>
        </main>
    </>
};
