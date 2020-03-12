import React, {useState} from 'react';
import Button from "./Button";

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
        return <Button onClick={onSelect}
                       key={text}
                       color={color}
        >
            <div className="py-6 text-white text-2xl font-bold">
                {text}
            </div>
        </Button>
    }

    return <div className="grid grid-cols-3 grid-rows-5 gap-2">
        <div className="col-span-3 px-4 flex self-center items-baseline">
            <span className="font-medium text-3xl">$</span>
            <input
                className="col-span-3 flex-grow text-right text-2xl text-gray-900 bg-transparent"
                value={input}
                type="text"
                readOnly
            />
            <span className="px-2 font-medium text-3xl cursor-pointer select-none" onClick={erase}>⌫</span>
        </div>

        {
            buttonOrder.map(text => (
                button(text, buttons[text], handleButton.bind(null, text))
            ))
        }

        {button('OK', 'green', handleOk)}
    </div>
}
