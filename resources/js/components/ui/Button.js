import React from 'react';
import tailwind from "../helpers/tailwind";

const Wrapper = tailwind.div`
    transform flex items-center justify-center box-border
    transition-all duration-150 ease-out
    ${({color}) => `bg-${color}-600`}
    ${({when}) => when('selected', 'border-2 border-b-0')}
    ${({when, color}) => when('selected', `border-${color}-800`)}
    cursor-pointer rounded-lg
    ${({when}) => when('selected', 'shadow-underline', 'shadow-underline-none')}
    ${({when}) => when('selected', '-translate-y-10px')}
    ${({color, hoverable, selected}) => (!hoverable || selected ? '' : `hover:bg-${color}-700 hover:shadow`)}
`;

const Text = tailwind.div`
    text-white
`;

export default function ({onClick, children, ...rest}) {
    const props = {
        color: 'gray',
        selected: false,
        hoverable: true,
        ...rest
    };

    return <Wrapper $onClick={onClick} {...props}>
        <Text>{children}</Text>
    </Wrapper>
}
