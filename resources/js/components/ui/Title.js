import React from 'react';
import Dashes from "./Dashes";

export default function Title({children}) {
    return <>
        <div className="flex items-center w-full">
            {children && <>
                <Dashes/>
                <h2 className="flex-grow-0 mx-2 font-medium text-gray-700 text-2xl tracking-wide uppercase">{children}</h2>
            </>}
            <Dashes/>
        </div>
    </>
}
