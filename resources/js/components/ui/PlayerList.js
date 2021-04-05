import React, {useState} from 'react';
import PlayerButton from "./PlayerButton";
import Button from "./Button";
import tailwind from "../helpers/tailwind";

const Pad = tailwind.div`
    p-4
`;

const Wrapper = tailwind.div`
    p-5 grid grid-cols-4 gap-4
`;

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

    return <Wrapper>
        {
            includeBank &&
            <Button
                key="bank"
                onClick={handleClick.bind(null, {id: 0})}
                selected={selected === 0}
                color="gray"
            >
                <Pad>Banco</Pad>
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
    </Wrapper>
}
