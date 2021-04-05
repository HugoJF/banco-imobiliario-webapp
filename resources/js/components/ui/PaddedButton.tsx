import React from 'react';
import Button from "./Button";

export default function ({className, children, ...rest}) {
    return <Button className={`py-3 px-5 ${className}`} {...rest}>
        {children}
    </Button>
}
