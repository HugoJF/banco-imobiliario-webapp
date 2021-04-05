import React from 'react';
import {Title} from "../ui/Title";
import {UserList} from "../UserList";
import {Button} from "../ui/Button";
import {ButtonGroup} from "../ui/ButtonGroup";
import {UserType} from "../../types";

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

export const MatchConfigContainer: React.FC = () => {
    return <div className="space-y-8">
        <Title>Criando partida</Title>

        <ButtonGroup>
            <Button>Dinheiro inicial: $2,250,000</Button>
        </ButtonGroup>

        <UserList clickable={false} users={users}/>

        <ButtonGroup>
            <Button>Iniciar partida</Button>
        </ButtonGroup>
    </div>
};
