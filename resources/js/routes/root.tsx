import React, {useEffect} from "react";
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

export const Root = () => {
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        dispatch.auth.me();
    }, []);

    return <>
        <HeaderContainer/>
        <main className="pt-4 mx-auto container">
            <Switch>
                <Redirect exact path="/" to="/login"/>
                <Route path="/login" children={<LoginContainer/>}/>

                <Redirect path="/home" to="/matches"/>
                <AuthedRoute path="/matches/create" children={<MatchCreateContainer/>}/>
                <AuthedRoute path="/matches" children={<MatchSelectionContainer/>}/>
                <AuthedRoute path="/match/:id/config" children={<MatchConfigContainer/>}/>
                <AuthedRoute path="/match/:id/balances" children={<MatchBalancesContainer/>}/>
                <AuthedRoute path="/match/:id" children={<MatchViewContainer/>}/>

                <Redirect to="/home"/>
            </Switch>
        </main>
    </>
};
