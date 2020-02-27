import React, {useState} from 'react';
import PlayerDisplay from "./PlayerDisplay";

export default function ({players, onSelect, initialSelect}) {
    const [selected, setSelected] = useState(initialSelect);

    function handleOnSelect(player) {
        setSelected(player.id);
        if (onSelect) {
            onSelect(player);
        }
    }

    return <div className="p-5 grid grid-cols-4 gap-4">
        {
            players.map(player => <PlayerDisplay
                onSelect={handleOnSelect.bind(null, player)}
                selected={player.id === selected}
                player={player}
            />)
        }
    </div>;
}
