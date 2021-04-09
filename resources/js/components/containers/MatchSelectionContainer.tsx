import React from 'react';
import {Title} from "../ui/Title";
import {MatchList} from "../MatchList";
import {Button} from "../ui/Button";
import {Loader, Plus} from "react-feather";
import {ButtonGroup} from "../ui/ButtonGroup";
import {useMatches} from "../../queries/useMatches";
import {MatchType} from "../../types";
import {useHistory} from "react-router";

export const MatchSelectionContainer: React.FC = () => {
    const history = useHistory();
    const {status, data, error, isFetching} = useMatches();

    function handleOnClick(match: MatchType) {
        history.push(`/match/${match.id}`)
    }

    function handleOnCreate() {
        history.push('/matches/create');
    }

    if (!data) {
        return <Loader/>;
    }

    return <div className="space-y-8">
        <Title>Partidas online</Title>

        <MatchList
            matches={data.data}
            onClick={handleOnClick}
        />

        <ButtonGroup>
            <Button
                onClick={handleOnCreate}
                icon={Plus}
            >
                Criar nova partida
            </Button>
        </ButtonGroup>
    </div>
};
