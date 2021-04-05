import React from 'react';
import {formatNumber} from "../helpers/helpers";
import tailwind from "../helpers/tailwind";
import {useDispatch} from "react-redux";
import usePlayers from "../../hooks/usePlayers";
import Arrow from "../svg/Arrow";
import Button from "./Button";

const Wrapper = tailwind.div`
    flex justify-between items-center p-2
    ${({when}) => when('canceled', 'opacity-50')}
`;
const Name = tailwind.p`
    mx-2 text-lg text-gray-700
`;
const ValueWrapper = tailwind.div`
    mr-4 text-xl text-gray-800 tracking-wide
`;
const Dollar = tailwind.span`
    font-thin text-gray-700
`;
const Value = tailwind.span`
    font-medium
`;
const Suffix = tailwind.span`
    font-hairline text-gray-800 text-base
`;
const ArrowWrapper = tailwind.div`
    text-gray-300 fill-current
`;
const Info = tailwind.div`
    flex items-center mx-2
`;

const Canceled = tailwind.p`
    px-3 py-2
`;

export default function ({transaction}) {
    const dispatch = useDispatch();
    const players = usePlayers();
    const {id, origin_id, value, destination_id, canceled_at} = transaction;

    const origin = players[origin_id];
    const destination = players[destination_id];

    const [v, suffix] = formatNumber(value);

    function handleCancel() {
        dispatch.transactions.cancel(id);
    }

    return <Wrapper canceled={canceled_at}>
        <Name>{origin ? origin.name : 'Banco'}</Name>
        <Info>
            <ValueWrapper>
                <Dollar>$</Dollar>
                <Value>{v.toPrecision(3)}</Value>
                <Suffix>{suffix}</Suffix>
            </ValueWrapper>
            <ArrowWrapper $title={`Transação ${id}`}>
                <Arrow/>
            </ArrowWrapper>
        </Info>
        <Name>{destination ? destination.name : 'Banco'}</Name>
        {
            canceled_at ?
                <Canceled>Cancelado</Canceled>
                :
                <Button onClick={handleCancel} className="py-2 px-3" color="red">Cancelar</Button>
        }
    </Wrapper>
}
