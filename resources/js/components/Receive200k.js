import React from 'react';
import usePlayers from "../hooks/usePlayers";
import PlayerList from "./ui/PlayerList";
import Button from "./ui/Button";
import {useNavigate} from "@reach/router";
import Title from "./ui/Title";
import {useDispatch} from "react-redux";
import useMatch from "../hooks/useMatch";
import PaddedButton from "./ui/PaddedButton";

export default function () {
    const dispatch = useDispatch();
    const players = usePlayers();
    const navigate = useNavigate();
    const match = useMatch();

    function handlePlayerSelect(player) {
        dispatch.transactions.create({
            id: match.id,
            data: {
                origin_id: null,
                destination_id: player.id,
                value: 200000,
            }
        });
        goBack();
    }

    function goBack() {
        navigate('/');
    }

    return <div>
        <Title>Selecione o jogador para receber 200 mil</Title>

        <PlayerList
            onSelect={handlePlayerSelect}
            includeBank={false}
            players={Object.values(players)}
        />

        <PaddedButton onClick={goBack} color="gray">
            <span className="px-5 py-2">Voltar</span>
        </PaddedButton>
    </div>
}
