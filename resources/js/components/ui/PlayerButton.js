import React from 'react';
import Button from "./Button";

export default function ({player, name, ...rest}) {
    return <Button color={player.color} {...rest}>
        <div className="px-4 py-4">{player.name}</div>
    </Button>
}
