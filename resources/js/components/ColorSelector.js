import React, {useState} from 'react';
import ColorButton from "./ColorButton";

const colors = ['blue', 'red', 'green', 'yellow', 'gray', 'purple'];

export default function ColorSelector() {
    const [selected, setSelected] = useState(null);

    return <div className="antialiased flex flex-wrap justify-center m-4">
        {
            colors.map(color => <ColorButton
                onSelect={setSelected.bind(null, color)}
                selected={color === selected}
                color={color}
            />)
        }
    </div>
}
