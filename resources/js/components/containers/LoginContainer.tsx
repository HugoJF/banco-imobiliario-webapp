import React, {useEffect} from 'react';
import {Title} from "../ui/Title";
import {UserList} from "../UserList";
import {Button} from "../ui/Button";
import {Loader, Plus} from "react-feather";
import {ButtonGroup} from "../ui/ButtonGroup";
import {useUsers} from "../../queries/useUsers";
import {UserType} from "../../types/users";
import {useDispatch} from "react-redux";
import {Dispatch} from "../../store";
import {useHistory} from "react-router";
import {useIsAuthed} from "../../hooks/useIsAuthed";

export const LoginContainer: React.FC = () => {
    const authed = useIsAuthed();
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const {status, data, error, isFetching} = useUsers();

    useEffect(() => {
        if (authed) {
            history.push('/home');
        }
    }, [authed]);

    async function handleOnClick(user: UserType) {
        await dispatch.auth.login(user);

        history.push('/home');
    }

    if (!data) {
        return <Loader/>;
    }

    return <div className="space-y-8">
        <Title>Usuários</Title>

        <UserList
            onClick={handleOnClick}
            users={data.data.data}
        />

        <ButtonGroup>
            <Button icon={Plus}>Registrar</Button>
            <Button color="default">Entrar como espectador</Button>
        </ButtonGroup>
    </div>
};
