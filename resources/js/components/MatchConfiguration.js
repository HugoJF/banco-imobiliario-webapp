import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "@reach/router";
import useMatch from "../hooks/useMatch";
import usePlayers from "../hooks/usePlayers";
import useMe from "../hooks/useMe";
import Loading from "./ui/Loading";
import Title from "./ui/Title";
import PlayerColorSelector from "./ui/PlayerColorSelector";
import PlayerList from "./ui/PlayerList";
import PaddedButton from "./ui/PaddedButton";

export default function MatchConfiguration() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const me = useMe();
    const match = useMatch();
    const players = usePlayers();
    const [selectedUser, setSelectedUser] = useState(me);

    function handleColorSelect(color) {
        dispatch.players.edit({
            id: selectedUser,
            data: {color: color},
        })
    }

    function handlePlayerSelect(player) {
        setSelectedUser(player.id);
    }

    function handleModifyStartingMoney() {
        navigate('/dinheiro-inicial');
    }

    return <>
        <div className="antialiased flex flex-col items-center m-4">
            <Title>Dinheiro inicial</Title>

            <h4 className="mb-4 font-normal text-center text-gray-500 text-2xl">
                ${Number(match.starting_money).toLocaleString('pt-BR')}
            </h4>

            <PaddedButton color="blue" onClick={handleModifyStartingMoney}>Modificar</PaddedButton>

            <Title>Jogadores</Title>

            {
                players === null
                    ?
                    <Loading>chateando o mundo</Loading>
                    :
                    <PlayerList
                        onSelect={handlePlayerSelect}
                        initialSelect={me}
                        includeBank={false}
                        players={Object.values(players)}
                    />
            }

            <Title>Selecione a sua cor</Title>

            <PlayerColorSelector forceSelect={players[selectedUser].color} onSelect={handleColorSelect}/>

            <Title/>

            <div className="grid grid-cols-2-auto gap-2">
                <PaddedButton color="green" onClick={dispatch.match.start.bind(null, match.id)}>Iniciar partida</PaddedButton>
                <PaddedButton color="red" onClick={dispatch.match.leave.bind(null, match.id)}>Sair da partida</PaddedButton>
            </div>
        </div>
    </>
}
