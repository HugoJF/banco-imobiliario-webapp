import React, {useState} from 'react';
import ColorButton from "./ColorButton";
import useMe from "../../hooks/useMe";
import usePlayers from "../../hooks/usePlayers";
import tailwind from "../helpers/tailwind";

const colors = ['blue', 'red', 'green', 'yellow', 'gray', 'purple'];

const Wrapper = tailwind.div`
    m-4 grid grid-cols-3 gap-4 justify-center
`;

export default function PlayerColorSelector({forceSelect, onSelect}) {
    const me = useMe();
    const players = usePlayers();
    const [selected, setSelected] = useState(players[me] ? players[me].color : null);

    function handleClick(color) {
        if (!forceSelect) {
            setSelected(color);
        }
        if (onSelect) {
            onSelect(color);
        }
    }

    return <Wrapper>
        {
            colors.map(color => <ColorButton
                onClick={handleClick.bind(null, color)}
                selected={(forceSelect !== undefined ? forceSelect : selected) === color}
                color={color}
            />)
        }
    </Wrapper>
}
