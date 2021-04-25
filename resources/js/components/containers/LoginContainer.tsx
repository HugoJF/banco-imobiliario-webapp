import React, {useEffect, useState} from 'react';
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
    const [authing, setAuthing] = useState(false);
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const users = useUsers();

    useEffect(() => {
        if (authed) {
            history.push('/home');
        }
    }, [authed]);

    async function handleOnClick(user: null|UserType) {
        if (!user) {
            return;
        }

        setAuthing(true);
        await dispatch.auth.login(user.id);

        history.push('/home');
    }

    if (!users.data) {
        return <Loader/>;
    }

    return <div className="space-y-8">
        <Title>Usuários</Title>

        <UserList
            onClick={handleOnClick}
            users={users.data.data.data}
            loading={users.isFetching || authing}
        />

        <ButtonGroup>
            <Button onClick={() => history.push('/register')} icon={Plus}>Registrar</Button>
            <Button color="default">Entrar como espectador</Button>
        </ButtonGroup>
    </div>
};
