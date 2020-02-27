import React from 'react';
import {useDispatch} from "react-redux";
import Button from "./ui/Button";
import Title from "./ui/Title";

export default function MatchJoin() {
    const dispatch = useDispatch();

    function handleOnSubmit(e) {
        if (e.key === 'Enter') {
            dispatch.match.join(e.target.value);
        }
    }

    function handleOnCreate(e) {
        dispatch.match.createAndJoin();
    }

    return <>
        <div className="antialiased flex flex-col items-center m-4">
            <Title>Código da partida</Title>

            <input onKeyUp={handleOnSubmit} className="
              m-4 w-24 py-1
              bg-transparent focus:bg-gray-800
              font-mono
              text-center text-xl text-gray-800 placeholder-gray-800 focus:text-gray-100
              border border-gray-900
              tracking-wider rounded outline-none"
                   type="text"
                   placeholder="****"
            />

            <Button onClick={handleOnCreate}>Criar partida</Button>
        </div>
    </>
}
