import React from 'react';
import Check from "./svg/Check";
import SelectableButton from "./SelectableButton";

export default function ColorButton(params) {
    let {selected} = params;

    return <SelectableButton className="w-24 h-24" {...params}>
        <div className="flex items-center justify-center">
            <div className="w-10 h-10">
                {selected && <Check/>}
            </div>
        </div>
    </SelectableButton>
}
