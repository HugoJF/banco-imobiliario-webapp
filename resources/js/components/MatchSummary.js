import React from 'react';
import useMatch from "../hooks/useMatch";
import usePlayers from "../hooks/usePlayers";
import {useDispatch} from "react-redux";

export default function MatchSummary() {
    const dispatch = useDispatch();
    const match = useMatch();
    const players = usePlayers();

    return <>
        <div className="antialiased flex flex-col items-center m-4">
            <h3 className="mb-4 font-medium text-gray-700 text-xl tracking-wide uppercase">Dinheiro inicial</h3>

            <h4 className="mb-4 font-normal text-center text-gray-500 text-lg">${match.starting_money}</h4>

            <h3 className="mb-4 font-medium text-gray-700 text-xl tracking-wide uppercase">Jogadores</h3>

            {
                players === null
                    ?
                    <p>Loading players...</p>
                    :
                    Object.values(players).map((player) => (
                        <div key={player.id} className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 flex items-center justify-between p-4 border-l-4 border-gray-600 bg-gray-300">
                            <div className="font-medium text-xl text-gray-800">
                                {player.name}
                            </div>
                        </div>
                    ))
            }

            <button onClick={dispatch.match.start.bind(null, match.id)} className="p-4 border border-gray-700">Iniciar partida</button>

            <button onClick={dispatch.match.leave.bind(null, match.id)} className="p-4 border border-gray-700">Sair da partida</button>
        </div>
    </>
}
