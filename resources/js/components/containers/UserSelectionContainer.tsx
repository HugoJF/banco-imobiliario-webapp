import React from 'react';
import {Title} from "../ui/Title";
import {UserList} from "../UserList";
import {UserType} from "../../types";
import {Button} from "../ui/Button";
import {Plus} from "react-feather";
import {ButtonGroup} from "../ui/ButtonGroup";

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

export const UserSelectionContainer: React.FC = () => {
    return <div className="space-y-8">
        <Title>Usuários</Title>

        <UserList users={users}/>

        <ButtonGroup>
            <Button icon={Plus}>Registrar</Button>
            <Button color="default" icon={Plus}>Entrar como espectador</Button>
        </ButtonGroup>
    </div>
};
