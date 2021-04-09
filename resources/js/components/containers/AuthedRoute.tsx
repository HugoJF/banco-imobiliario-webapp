import React from "react";
import {Redirect, Route} from "react-router-dom";
import {RouteProps} from "react-router";
import {useIsAuthed} from "../../hooks/useIsAuthed";

export const AuthedRoute: React.FC<RouteProps> = ({children, ...rest}) => {
    const logged = useIsAuthed();

    return (
        <Route
            {...rest}
            render={({location}) =>
                logged ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
};
