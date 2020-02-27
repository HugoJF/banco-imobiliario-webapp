import React from 'react';
import SelectableButton from "./SelectableButton";

export default function ({player, ...rest}) {
    return <SelectableButton className="px-4 py-2" color={player.color} {...rest}>
        <div className="">{player.name}</div>
    </SelectableButton>
}
