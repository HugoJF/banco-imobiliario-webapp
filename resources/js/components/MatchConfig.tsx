import React from 'react';
import {Title} from "./ui/Title";
import {UserList} from "./UserList";
import {Button} from "./ui/Button";
import {ButtonGroup} from "./ui/ButtonGroup";
import {UserType} from "../types/users";
import {MatchType} from "../types";

type MatchConfigProps = {
    match: MatchType;
}

export const MatchConfig: React.FC<MatchConfigProps> = ({match}) => {
    return <div className="space-y-8">
        <Title>Criando partida</Title>

        <ButtonGroup>
            <Button>Dinheiro inicial: $2,250,000</Button>
        </ButtonGroup>

        <UserList clickable={false} users={match.users}/>

        <ButtonGroup>
            <Button>Iniciar partida</Button>
        </ButtonGroup>
    </div>
};
