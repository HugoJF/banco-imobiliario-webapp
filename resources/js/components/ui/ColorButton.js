import React from 'react';
import Check from "../svg/Check";
import Button from "./Button";

export default function ColorButton(params) {
    let {selected, color} = params;
    return <Button className="w-24 h-24" {...params}>
        <div className="flex items-center justify-center">
            <div className={`w-10 h-10 text-${color}-900`}>
                {selected && <Check/>}
            </div>
        </div>
    </Button>
}
