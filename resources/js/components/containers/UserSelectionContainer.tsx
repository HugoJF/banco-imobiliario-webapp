import React from 'react';
import {Title} from "../ui/Title";
import {UserList} from "../UserList";
import {Button} from "../ui/Button";
import {Loader, Plus} from "react-feather";
import {ButtonGroup} from "../ui/ButtonGroup";
import {useUsers} from "../../queries/useUsers";

export const UserSelectionContainer: React.FC = () => {
    const {status, data, error, isFetching} = useUsers();

    if (!data) {
        return <Loader/>;
    }

    return <div className="space-y-8">
        <Title>Usuários</Title>

        <UserList users={data.data}/>

        <ButtonGroup>
            <Button icon={Plus}>Registrar</Button>
            <Button color="default">Entrar como espectador</Button>
        </ButtonGroup>
    </div>
};
