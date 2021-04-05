import React from 'react';
import tailwind from './helpers/tailwind';
import {useNavigate} from "@reach/router";
import {useDispatch} from "react-redux";
import usePlayers from "../hooks/usePlayers";
import useMatch from "../hooks/useMatch";
import Button from "./ui/Button";

export default function () {
    const dispatch = useDispatch();
    const players = usePlayers();
    const navigate = useNavigate();
    const match = useMatch();

    const button = (onClick, text, color = 'blue') => (
        <div className="my-2">
            <Button onClick={onClick} color={color}>
                <p className="px-4 py-4 text-white text-lg">{text}</p>
            </Button>
        </div>
    );

    const redirectButton = (path, text, color = 'blue') => button(navigate.bind(null, path), text, color);

    if (!players) {
        return '';
    }

    function nextTurn() {
        dispatch.match.nextTurn(match.id);
    }

    return <div>
        <h2 className="text-center text-5xl text-gray-800">
            Rodada {match.turn}
        </h2>

        <div className="grid grid-cols-2 gap-1">
            <div className="col-span-2">
                {button(nextTurn, 'Próximo round', 'green')}
            </div>

            {redirectButton('receber', '200k')}
            {redirectButton('pagar', 'Pagar')}
            {redirectButton('cadeia', 'Cadeia')}
            {redirectButton('transacoes', 'Transacoes')}

            <div className="col-span-2">
                {redirectButton('finalizar', 'Finalizar partida', 'red')}
            </div>
        </div>
    </div>
}
