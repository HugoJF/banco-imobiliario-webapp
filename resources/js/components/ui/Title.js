import React from 'react';
import Dashes from "./Dashes";
import tailwind from "../helpers/tailwind";

const Wrapper = tailwind.div`
    flex items-center w-full
`;

const Header = tailwind.div`
    flex-grow-0 mx-2 font-medium text-gray-700 text-2xl tracking-wide uppercase
`;

export default function Title({children}) {
    return <Wrapper>
        {children && <>
            <Dashes/>
            <Header>{children}</Header>
        </>}
        <Dashes/>
    </Wrapper>
}
