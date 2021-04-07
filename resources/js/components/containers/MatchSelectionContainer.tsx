import React from 'react';
import {Title} from "../ui/Title";
import {MatchList} from "../MatchList";
import {Button} from "../ui/Button";
import {Loader, Plus} from "react-feather";
import {ButtonGroup} from "../ui/ButtonGroup";
import {useMatches} from "../../queries/useMatches";

export const MatchSelectionContainer: React.FC = () => {
    const {status, data, error, isFetching} = useMatches();

    if (!data) {
        return <Loader/>;
    }

    return <div className="space-y-8">
        <Title>Partidas em andamento</Title>

        <MatchList matches={data.data}/>

        <ButtonGroup>
            <Button icon={Plus}>Criar nova partida</Button>
        </ButtonGroup>
    </div>
};
