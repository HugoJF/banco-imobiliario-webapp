import React, {useState, useEffect} from 'react';
import {useNavigate} from "@reach/router";
import {useDispatch} from "react-redux";
import usePlayers from "../hooks/usePlayers";
import useMatch from "../hooks/useMatch";
import Title from "./ui/Title";
import PlayerList from "./ui/PlayerList";
import PaddedButton from "./ui/PaddedButton";
import Numpad from "./ui/Numpad";
import Error from "./ui/Error";

export default function () {
    const dispatch = useDispatch();
    const [origin, setOrigin] = useState(null);
    const [originError, setOriginError] = useState(false);
    const [destination, setDestination] = useState(null);
    const [destinationError, setDestinationError] = useState(false);
    const [valueError, setValueError] = useState(false);
    const [sameDestination, setSameDestination] = useState(false);
    const match = useMatch();
    const players = usePlayers();
    const navigate = useNavigate();


    useEffect(() => {
        if (origin !== null && destination !== null) {
            setSameDestination(origin === destination);
        }
    }, [origin, destination]);

    function handleOriginSelect(player) {
        setOrigin(player?.id);
        setOriginError(!player);
    }

    function handleDestinationSelect(player) {
        setDestination(player?.id);
        setDestinationError(!player);
    }

    function goBack() {
        navigate('/');
    }

    function handleOk(value) {
        let validValue = !isNaN(value) && value > 0;

        setOriginError(!origin);
        setDestinationError(!destination);
        setValueError(!validValue);

        if (origin === null || destination === null || !validValue) {
            return;
        }

        dispatch.transactions.create({
            id: match.id,
            data: {
                // TODO: deal with this shit
                origin_id: origin === 0 ? null : origin,
                destination_id: destination === 0 ? null : destination,
                value: value,
            }
        });
        goBack();
    }

    return <div>
        <Title>Origem</Title>
        <Error enabled={originError}>
            Por favor selecione um jogador de origem!
        </Error>
        <Error enabled={sameDestination}>
            Não é possível fazer uma transação com origem e destino iguais!
        </Error>
        <PlayerList
            onSelect={handleOriginSelect}
            players={Object.values(players)}
        />

        <Title>Destino</Title>
        <Error enabled={destinationError}>
            Por favor selecione um jogador de destino!
        </Error>
        <Error enabled={sameDestination}>
            Não é possível fazer uma transação com origem e destino iguais!
        </Error>
        <PlayerList
            onSelect={handleDestinationSelect}
            players={Object.values(players)}
        />

        <Title>Valor</Title>
        <Error enabled={valueError}>
            Por favor digite um valor para ser transferido!
        </Error>
        <Numpad onOk={handleOk}/>

        <PaddedButton className="mt-4" onClick={goBack} color="gray">
            Voltar
        </PaddedButton>
    </div>
}
