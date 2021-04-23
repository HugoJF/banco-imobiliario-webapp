import React, {useState} from 'react';
import {Title} from "../ui/Title";
import {Button} from "../ui/Button";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {Dispatch} from "../../store";
import {LaravelErrorBag} from "../../types";
import {AxiosError} from "axios";

const format = new Intl.NumberFormat('pt-BR');

export const UserRegistrationContainer: React.FC = () => {
    const dispatch = useDispatch<Dispatch>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();

    function handleOnNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.currentTarget.value);
    }

    function handleOnEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.currentTarget.value);
    }

    async function handleOnCreate() {
        try {
            await dispatch.auth.registration({
                name,
                email,
                // TODO: figure a better way to handle registration
                password: '123123123',
                password_confirmation: '123123123',
            });
        } catch (e) {
            const error = e as AxiosError<LaravelErrorBag<'name' | 'email' | 'password' | 'password_confirmation'>>
            // TODO: handle errors
        }
        history.push('/login');
    }

    return <div className="space-y-8">
        <Title>Criando partida</Title>

        {/* User name */}
        <div>
            <label
                className="block text-xl font-bold"
                htmlFor="name"
            >
                Nome
            </label>
            <div className="flex w-full">
                <input
                    id="name"
                    className="py-2 px-4 flex-grow bg-transparent text-lg border-black border-b-2"
                    type="text"
                    onChange={handleOnNameChange}
                    value={name}
                />
            </div>
        </div>

        {/* User email */}
        <div>
            <label
                className="block text-xl font-bold"
                htmlFor="email"
            >
                Email
            </label>
            <div className="flex w-full">
                <input
                    id="email"
                    name="email"
                    className="py-2 px-4 flex-grow bg-transparent text-lg border-black border-b-2"
                    type="text"
                    onChange={handleOnEmailChange}
                    value={email}
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
