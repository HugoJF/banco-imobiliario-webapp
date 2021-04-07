import React from "react";
import {Redirect} from "react-router-dom";
import {Route, Switch} from "react-router";
import {MatchViewContainer} from "../components/containers/MatchViewContainer";
import {MatchConfigContainer} from "../components/containers/MatchConfigContainer";
import {UserSelectionContainer} from "../components/containers/UserSelectionContainer";
import {MatchSelectionContainer} from "../components/containers/MatchSelectionContainer";

export const Root = () => {
    return <Switch>
        <Route path="/users" children={<UserSelectionContainer/>}/>
        <Route path="/matches" children={<MatchSelectionContainer/>}/>
        <Route path="/match/:id/config" children={<MatchConfigContainer/>}/>
        <Route path="/match/:id" children={<MatchViewContainer/>}/>

        <Redirect to="/users"/>
    </Switch>
};
