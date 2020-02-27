import React, {useEffect, useState} from 'react';
import useMatch from "../hooks/useMatch";
import usePlayers from "../hooks/usePlayers";
import {useDispatch} from "react-redux";
import Loading from "./ui/Loading";
import ColorSelector from "./ColorSelector";
import Button from "./ui/Button";
import Title from "./ui/Title";
import PlayerList from "./PlayerList";
import useMe from "../hooks/useMe";

export default function MatchSummary() {
    const dispatch = useDispatch();
    const me = useMe();
    const match = useMatch();
    const players = usePlayers();
    const [selectedUser, setSelectedUser] = useState(me);

    useEffect(() => {
        // TODO: 1?
        dispatch.balances.get(1);
    }, []);

    function handleColorSelection(color) {
        dispatch.players.edit({
            id: selectedUser,
            data: {color: color},
        })
    }

    function handlePlayerSelection(player) {
        setSelectedUser(player.id);
    }

    return <>
        <div className="antialiased flex flex-col items-center m-4">
            <Title>Dinheiro inicial</Title>

            <h4 className="mb-4 font-normal text-center text-gray-500 text-lg">${match.starting_money}</h4>

            <Title>Jogadores</Title>

            {
                players === null
                    ?
                    <Loading>chateando o mundo</Loading>
                    :
                    <PlayerList onSelect={handlePlayerSelection} initialSelect={me} players={Object.values(players)}/>
            }

            <Title>Selecione a sua cor</Title>

            <ColorSelector forceSelect={players[selectedUser].color} onSelect={handleColorSelection}/>

            <Title/>

            <div className="antialiased flex justify-center items-center">
                <Button color="green" onClick={dispatch.match.start.bind(null, match.id)}>Iniciar partida</Button>
                <Button color="red" onClick={dispatch.match.leave.bind(null, match.id)}>Sair da partida</Button>
            </div>
        </div>
    </>
}
