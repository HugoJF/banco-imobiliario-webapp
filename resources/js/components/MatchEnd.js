import React from 'react';
import {useNavigate} from "@reach/router";
import {useDispatch} from "react-redux";
import useMatch from "../hooks/useMatch";
import Title from "./ui/Title";
import PaddedButton from "./ui/PaddedButton";

export default function () {
    const dispatch = useDispatch();
    const match = useMatch();
    const navigate = useNavigate();

    async function handleEnd() {
        await dispatch.match.end(match.id);
        navigate('/');
    }

    function handleBack() {
        navigate('/');
    }

    return <div className="antialiased flex flex-col items-center m-4">
        <Title>Finalizar partida?</Title>

        <div className="grid grid-cols-2">
            <PaddedButton color="red" onClick={handleEnd}>Finalizar</PaddedButton>
            <PaddedButton color="blue" onClick={handleBack}>Voltar</PaddedButton>
        </div>
    </div>
}
