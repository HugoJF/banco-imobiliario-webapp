import React from "react";
import {Redirect} from "react-router-dom";
import {Route, Switch} from "react-router";
import {AuthedRoute} from "../components/containers/AuthedRoute";
import {LoginContainer} from "../components/containers/LoginContainer";
import {MatchViewContainer} from "../components/containers/MatchViewContainer";
import {MatchConfigContainer} from "../components/containers/MatchConfigContainer";
import {MatchSelectionContainer} from "../components/containers/MatchSelectionContainer";

export const Root = () => {
    return <Switch>
        <Redirect exact path="/" to="/login"/>
        <Route path="/login" children={<LoginContainer/>}/>

        <Redirect path="/home" to="/matches"/>
        <AuthedRoute path="/matches" children={<MatchSelectionContainer/>}/>
        <AuthedRoute path="/match/:id/config" children={<MatchConfigContainer/>}/>
        <AuthedRoute path="/match/:id" children={<MatchViewContainer/>}/>

        <Redirect to="/home"/>
    </Switch>
};
