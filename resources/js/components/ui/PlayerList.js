import React, {useState} from 'react';
import PlayerButton from "./PlayerButton";
import Button from "./Button";

export default function ({players, onSelect, includeBank = true, selectable = true, initialSelect}) {
    const [selected, setSelected] = useState(initialSelect);

    function handleClick(player) {
        let newPlayer = null;

        if (player.id !== selected) {
            newPlayer = player;
        }

        if (selectable) {
            setSelected(newPlayer?.id);
        }

        if (onSelect) {
            onSelect(newPlayer);
        }
    }

    // TODO: implement bank
    return <div className="p-5 grid grid-cols-4 gap-4">
        {
            includeBank &&
            <Button
                key="bank"
                onClick={handleClick.bind(null, {id: 0})}
                selected={selected === 0}
                color="gray"
            >
                <div className="px-4 py-4">Banco</div>
            </Button>
        }
        {
            players.map(player => <PlayerButton
                key={player.id}
                onClick={handleClick.bind(null, player)}
                selected={player.id === selected}
                player={player}
            />)
        }
    </div>
}
