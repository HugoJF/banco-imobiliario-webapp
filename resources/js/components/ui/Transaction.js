import React from 'react';
import usePlayers from "../../hooks/usePlayers";
import Arrow from "../svg/Arrow";
import Button from "./Button";
import {formatNumber} from "../helpers/helpers";

export default function ({transaction}) {
    const players = usePlayers();
    const {origin_id, value, destination_id} = transaction;

    const origin = players[origin_id];
    const destination = players[destination_id];
    const [v, suffix] = formatNumber(value);

    return <div className="flex justify-between items-center p-2">
        <p className="mx-2 text-lg text-gray-700">{origin ? origin.name : 'Banco'}</p>
        <div className="flex items-center mx-2">
            <p className="mr-4 text-xl text-gray-800 tracking-wide">
                <span className="font-thin text-gray-700">$</span>
                <span className="font-medium">{v.toPrecision(3)}</span>
                <span className="font-hairline text-gray-800 text-base">{suffix}</span>
            </p>
            <span className="text-gray-300 fill-current">
                <Arrow />
            </span>
        </div>
        <p className="mx-2 text-lg text-gray-700">{destination ? destination.name : 'Banco'}</p>
        <div>
            <Button className="py-2 px-3" color="red">Cancelar</Button>
        </div>
    </div>
}
