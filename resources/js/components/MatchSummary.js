import React from 'react';
import useMatch from "../hooks/useMatch";
import usePlayers from "../hooks/usePlayers";

export default function MatchSummary() {
    const match = useMatch();
    const players = usePlayers();

    return <>
        <h3 className="font-normal text-gray-500 text-lg">Starting money: ${match.starting_money}</h3>
        <ul>
            {
                players === null
                    ?
                    <p>Loading players...</p>
                    :
                    Object.values(players).map((player) => <li key={player.id}>{player.name}</li>)
            }
        </ul>
    </>
}
