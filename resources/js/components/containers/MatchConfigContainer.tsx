import React from 'react';
import {useParams} from "react-router";
import {MatchView} from "../MatchView";
import {useMatch} from "../../queries/useMatch";
import {Loader} from "react-feather";
import {MatchConfig} from "../MatchConfig";

export const MatchConfigContainer: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {status, data, error, isFetching} = useMatch(id);

    if (!data) {
        return <Loader/>;
    }

    return <MatchConfig
        match={data.data.data}
    />
};
