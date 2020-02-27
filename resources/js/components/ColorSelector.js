import React, {useState} from 'react';
import ColorButton from "./ColorButton";
import useMe from "../hooks/useMe";
import usePlayers from "../hooks/usePlayers";

const colors = ['blue', 'red', 'green', 'yellow', 'gray', 'purple'];

export default function ColorSelector({forceSelect, onSelect}) {
    const me = useMe();
    const players = usePlayers();
    const [selected, setSelected] = useState(players[me] ? players[me].color : null);

    function handleSelect(color) {
        if (!forceSelect) {
            setSelected(color);
        }
        if (onSelect) {
            onSelect(color);
        }
    }

    return <div className="antialiased m-4 grid grid-cols-3 gap-4 justify-center">
        {
            colors.map(color => <ColorButton
                onSelect={handleSelect.bind(null, color)}
                selected={(forceSelect !== undefined ? forceSelect : selected) === color}
                color={color}
            />)
        }
    </div>
}
