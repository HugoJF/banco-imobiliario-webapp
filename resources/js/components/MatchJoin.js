import React from 'react';
import {useDispatch} from "react-redux";

export default function MatchJoin() {
    const dispatch = useDispatch();

    function handleOnSubmit(e) {
        dispatch.match.join(e.target.value);
    }

    return <>
        <div className="antialiased flex flex-col items-center m-4">
            <h3 className="mb-4 font-medium text-gray-700 text-xl tracking-wide uppercase">Código da partida</h3>

            <input onKeyDown={handleOnSubmit} className="
              w-24 py-1
              bg-transparent focus:bg-gray-800
              font-mono
              text-center text-xl text-gray-800 placeholder-gray-800 focus:text-gray-100
              border border-gray-900
              tracking-wider rounded outline-none"
                   type="text"
                   placeholder="****"
            />
        </div>
    </>
}
