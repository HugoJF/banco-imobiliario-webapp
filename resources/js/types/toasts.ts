import React from "react";

export enum ToastTypes {
    PRIMARY = 'PRIMARY',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
}

export type ToastType = {
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
    type: ToastTypes;
    duration: number;
}
