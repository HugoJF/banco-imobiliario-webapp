import React, {useMemo} from 'react';
import {Title} from "./ui/Title";
import {Button} from "./ui/Button";
import {ButtonGroup} from "./ui/ButtonGroup";
import {MatchType} from "../types";
import {HorizontalButton} from "./ui/HorizontalButton";
import {Error} from "./ui/Error";
import {useAuth} from "../selectors";
import {UserList} from "./UserList";
import {useMatchJoin} from "../mutations/useMatchJoin";
import {useMatchLeave} from "../mutations/useMatchLeave";
import {Activity} from "react-feather";
import {useMatchNext} from "../mutations/useMatchNext";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {Dispatch} from "../store";
import {ToastTypes} from "../types/toasts";

export type MatchViewType = {
    match: MatchType;
}

export const MatchView: React.FC<MatchViewType> = ({match}) => {
    const dispatch = useDispatch<Dispatch>();
    const history = useHistory();
    const auth = useAuth();
    const joinMatch = useMatchJoin();
    const leaveMatch = useMatchLeave();
    const nextRound = useMatchNext();

    const inMatch = useMemo(() => Boolean(match.users.find(user => user.email === auth?.me?.email)), [match]);

    async function handleOnMatchJoin() {
        await joinMatch.mutateAsync(match.id);
        dispatch.toasts.add({
            title: 'Entrou na partida',
            description: `Você acabou de entrar na partida ${match.id}!`,
            type: ToastTypes.PRIMARY,
        })
    }

    async function handleOnMatchLeave() {
        await leaveMatch.mutateAsync(match.id);
    }

    async function handleOnMatchNext() {
        await nextRound.mutateAsync(match.id);
    }

    return <div className="space-y-8">
        <div className="flex justify-between">
            <Title>
                Partida #{match.id}
            </Title>
            <Title>
                <Activity
                    className="inline"
                    strokeWidth={3}
                    size={40}
                /> {match.turn}
            </Title>
        </div>

        {!inMatch && <>
            <Error>
                Você não faz parte dessa partida
            </Error>

            <Title sub>Jogadores</Title>
            <UserList
                users={match.users}
                clickable={false}
            />

            <ButtonGroup>
                <Button
                    loading={joinMatch.isLoading}
                    onClick={handleOnMatchJoin}
                >
                    Entrar na partida
                </Button>
            </ButtonGroup>
        </>}

        {inMatch && <div className="space-y-2">
            <Title sub>Ações</Title>
            <HorizontalButton>
                <h2 className="text-xl text-black font-bold tracking-tight">
                    Pagar
                </h2>
            </HorizontalButton>

            <HorizontalButton onClick={() => history.push(`/match/${match.id}/balances`)}>
                <h2 className="text-xl text-black font-bold tracking-tight">
                    Saldos
                </h2>
            </HorizontalButton>
        </div>}

        {inMatch && <ButtonGroup>
            <Button
                loading={nextRound.isLoading}
                onClick={handleOnMatchNext}
            >
                Próxima rodada
            </Button>
            <Button
                loading={leaveMatch.isLoading}
                color="default"
                onClick={handleOnMatchLeave}
            >
                Sair da partida
            </Button>
            <Button color="default">Finalizar partida</Button>
        </ButtonGroup>}
    </div>
};
