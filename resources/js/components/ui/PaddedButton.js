import React from 'react';
import Button from "./Button";

export default function ({className, children, ...rest}) {
    return <Button className={`p-4 ${className}`} {...rest}>
        {children}
    </Button>
}
