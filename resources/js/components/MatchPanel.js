import React from 'react';
import useMatch from "../hooks/useMatch";
import useBalances from "../hooks/useBalances";
import usePlayers from "../hooks/usePlayers";

export default function () {
    const match = useMatch();
    const players = usePlayers();
    const balances = useBalances();

    if (!players) {
        return 'loading..';
    }

    return <div>
        {Object.entries(players).map(([id, player]) => {
            return <p>{player.name}: ${balances[id] !== null? balances[id] : '-'}</p>
        })}
    </div>
}
