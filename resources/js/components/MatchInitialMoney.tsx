import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "@reach/router";
import useMatch from "../hooks/useMatch";
import Title from "./ui/Title";
import Numpad from "./ui/Numpad";
import Button from "./ui/Button";

export default function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const match = useMatch();

    function handleOk(value) {
        dispatch.match.update({
            id: match.id,
            data: {
                starting_money: value,
            }
        });
        navigate('/');
    }

    function handleBack() {
        navigate('/');
    }

    return <div>
        <Title>Quantidade inicial de dinheiro</Title>

        <Numpad onOk={handleOk}/>

        <Button className="mt-8 py-4" onClick={handleBack}>
            Voltar
        </Button>
    </div>
}
