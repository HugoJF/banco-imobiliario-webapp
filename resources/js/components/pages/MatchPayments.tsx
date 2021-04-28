import React, {useState} from 'react';
import {Title} from "../ui/Title";
import {UserList} from "../UserList";
import {Button} from "../ui/Button";
import {ButtonGroup} from "../ui/ButtonGroup";
import {UserType} from "../../types/users";
import {MatchType} from "../../types";
import {clamp, formatNumber} from "../helpers/helpers";
import {useMatchTransaction} from "../../mutations/useMatchTransaction";
import {Stat} from "../ui/Stat";
import {DollarSign} from "react-feather";

type MatchConfigProps = {
    match: MatchType;
    balances: { [id: string]: number }
}

const format = new Intl.NumberFormat('pt-BR');

export const MatchPayments: React.FC<MatchConfigProps> = ({match, balances}) => {
    const [value, setValue] = useState(100_000);
    const [from, setFrom] = useState<null|number>(null);
    const [to, setTo] = useState<null|number>(null);
    const transaction = useMatchTransaction(match.id);

    function handleOnValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        const current = parseInt(e.target.value.replace(/\./g, ''));

        setValue(clamp(current || 0, 0, Infinity));
    }

    function handleFromChange(user: null|UserType) {
        setFrom(user ? user.id : null);
    }

    function handleToChange(user?: null|UserType) {
        setTo(user ? user.id : null);
    }

    async function handleOnSubmit() {
        await transaction.mutateAsync({
            origin_id: from,
            destination_id: to,
            value: value,
        });
    }

    return <div className="space-y-8">
        <Title>Pagamentos</Title>

        {/* From */}
        <Title sub>Origem</Title>
        <UserList
            users={match.users}
            selected={from ?? undefined}
            onClick={handleFromChange}
            bank
        >
            {(user: UserType) => <Stat icon={DollarSign}>
                {formatNumber(balances[String(user.id)]).join('')}
            </Stat>}
        </UserList>

        {/* To */}
        <Title sub>Destino</Title>
        <UserList
            users={match.users}
            selected={to ?? undefined}
            onClick={handleToChange}
            bank
        >
            {(user: UserType) => <Stat icon={DollarSign}>
                {formatNumber(balances[String(user.id)]).join('')}
            </Stat>}
        </UserList>

        {/* Value */}
        <Title sub>Valor</Title>
        <div className="flex w-full">
            {/* Prefix */}
            <div className="py-2 px-4 bg-black text-gray-100 text-lg">
                $
            </div>

            {/* User input */}
            <input
                id="value"
                name="value"
                className="py-2 px-4 flex-grow bg-transparent text-lg border-black border-b-2"
                type="text"
                onChange={handleOnValueChange}
                value={format.format(value)}
            />
        </div>

        {/* Submit */}
        <ButtonGroup>
            <Button loading={transaction.isLoading} onClick={handleOnSubmit}>Enviar</Button>
        </ButtonGroup>
    </div>
};
