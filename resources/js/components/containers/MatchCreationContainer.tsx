import React, {useState} from 'react';
import {Title} from "../ui/Title";
import {Button} from "../ui/Button";
import {clamp} from "../helpers/helpers";
import {useMatchCreate} from "../../mutations/useMatchCreate";
import {useHistory} from "react-router";

const format = new Intl.NumberFormat('pt-BR');

export const MatchCreateContainer: React.FC = () => {
    const [value, setValue] = useState(1_500_000);
    const history = useHistory();
    const matchCreate = useMatchCreate();

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const current = parseInt(e.target.value.replace(/\./g, ''));

        setValue(clamp(current || 0, 0, Infinity));
    }

    async function handleOnCreate() {
        await matchCreate.mutateAsync({starting_money: value});
        history.push('/matches');
    }

    return <div className="space-y-8">
        <Title>Criando partida</Title>

        <div>
            <label
                className="block text-xl font-bold"
                htmlFor="starting_money"
            >
                Dinheiro inicial
            </label>
            <div className="flex w-full">
                {/* Prefix */}
                <div className="py-2 px-4 bg-black text-gray-100 text-lg">
                    $
                </div>

                {/* User input */}
                <input
                    id="starting_money"
                    className="py-2 px-4 flex-grow bg-transparent text-lg border-black border-b-2"
                    type="text"
                    onChange={handleOnChange}
                    value={format.format(value)}
                />
            </div>
        </div>

        <div className="grid grid-cols-1">
            <Button onClick={handleOnCreate}>
                Criar
            </Button>
        </div>
    </div>
};
