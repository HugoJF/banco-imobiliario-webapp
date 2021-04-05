import React from 'react';
import tailwind from "../helpers/tailwind";
import Check from "../svg/Check";
import Button from "./Button";

const Wrapper = tailwind.div`
    flex items-center justify-center
`;

const CheckContainer = tailwind.div`
    ${({color}) => `w-10 h-10 text-${color}-900`}
`;

export default function ColorButton(props) {
    let {selected, color} = props;
    return <Button className="w-24 h-24" {...props}>
        <Wrapper>
            <CheckContainer color={color}>
                {selected && <Check/>}
            </CheckContainer>
        </Wrapper>
    </Button>
}
