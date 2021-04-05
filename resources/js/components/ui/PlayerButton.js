import React from 'react';
import Button from "./Button";
import tailwind from "../helpers/tailwind";

const Pad = tailwind.div`
    px-4 py-4
`;

export default function ({player, name, ...rest}) {
    return <Button color={player.color} {...rest}>
        <Pad>{player.name}</Pad>
    </Button>
}
