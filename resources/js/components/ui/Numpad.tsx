import React, {useState} from 'react';
import Button from "./Button";
import tailwind from "../helpers/tailwind";

const buttons = {
    '1': 'gray',
    '2': 'gray',
    '3': 'gray',
    '4': 'gray',
    '5': 'gray',
    '6': 'gray',
    '7': 'gray',
    '8': 'gray',
    '9': 'gray',
    '0': 'gray',
    '000': 'gray',
};

const buttonOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '000'];

const EraseButton = tailwind.div`
    px-2 font-medium text-3xl cursor-pointer select-none
`;

const Dollar = tailwind.span`
    font-medium text-3xl
`;

const Input = tailwind.input`
    col-span-3 flex-grow text-right text-2xl text-gray-900 bg-transparent
`;

const Keyboard = tailwind.div`
    grid grid-cols-3 grid-rows-5 gap-2
`;

const InputGroup = tailwind.div`
    col-span-3 px-4 flex self-center items-baseline
`;

const ButtonWrapper = tailwind.div`
    py-6 text-white text-2xl font-bold
`;

export default function ({onOk}) {
    const [raw, setRaw] = useState('');
    const [input, setInput] = useState('');

    function handleOk() {
        let number = parseInt(raw);

        if (onOk) {
            onOk(number);
        }
    }

    function updateRaw(value) {
        setRaw(value);
        setInput(Number(value).toLocaleString('pt-BR'));
    }

    function handleButton(e) {
        updateRaw(raw + e);
    }

    function erase() {
        updateRaw(raw.slice(0, -1));
    }

    function button(text, color, onSelect) {
        return <Button
            $onClick={onSelect}
            $key={text}
            color={color}
        >
            <ButtonWrapper>{text}</ButtonWrapper>
        </Button>
    }

    return <Keyboard>
        <InputGroup>
            <Dollar>$</Dollar>
            <Input
                $value={input}
                $type="text"
                $readOnly
            />
            <EraseButton $onClick={erase}>⌫</EraseButton>
        </InputGroup>

        {
            buttonOrder.map(text => (
                button(text, buttons[text], handleButton.bind(null, text))
            ))
        }

        {button('OK', 'green', handleOk)}
    </Keyboard>
}
