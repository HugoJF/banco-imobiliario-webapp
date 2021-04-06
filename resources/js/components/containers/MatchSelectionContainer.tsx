import React from 'react';
import {Title} from "../ui/Title";
import {MatchType} from "../../types";
import {MatchList} from "../MatchList";
import {Button} from "../ui/Button";
import {Plus} from "react-feather";
import {ButtonGroup} from "../ui/ButtonGroup";
import {UserType} from "../../types/users";

const users: UserType[] = [
    {
        id: 1,
        email: 'asd@asd.com',
        name: 'Hugo',
        matches: 2
    }, {
        id: 2,
        email: 'dsa@dsa.com',
        name: 'Fulano',
        matches: 3,
    }
];

const matches: MatchType[] = [
    {
        id: 'cz1',
        users: users,
        rounds: 66,
        started_at: '1h30min',
        created_at: '1h30min',
        updated_at: '1h30min',
    }, {
        id: '23q',
        users: users,
        rounds: 0,
        started_at: null,
        created_at: '1h30min',
        updated_at: '1h30min',
    }
];

export const MatchSelectionContainer: React.FC = () => {
    return <div>
        <Title>Partidas em andamento</Title>

        <MatchList matches={matches}/>

        <ButtonGroup>
            <Button icon={Plus}>Criar nova partida</Button>
        </ButtonGroup>
    </div>
};
