import React, {useRef, useState} from "react";
import {Title} from "../components/ui/Title";
import {Button} from "../components/ui/Button";
import {Modal} from "../components/ui/Modal";

type ModalConfig = {
    title: string|JSX.Element;
    description?: string|JSX.Element;
    action?: string|JSX.Element;
}

export default function useConfirmation<T>() {
    const [config, setConfig] = useState<ModalConfig | null>(null);
    const [open, setOpen] = useState(false);
    const promiseRef = useRef<(value: boolean) => void>();

    function confirm(config: ModalConfig) {
        setConfig(config);
        setOpen(true);
        return new Promise(resolve => {
            promiseRef.current = resolve;
        })
    }

    function handleOnConfirm() {
        setOpen(false);
        if (promiseRef.current) {
            promiseRef.current(true);
        }
    }

    function handleOnCancel() {
        setOpen(false);
        if (promiseRef.current) {
            promiseRef.current(false);
        }
    }

    function handleOnClose() {
        setOpen(false);
    }

    const modal = <Modal className="py-2 px-5" open={open} onClose={handleOnClose}>
        <Title className="text-center">{config?.title}</Title>
        {config?.description && <Title className="text-center" subsub>{config?.description}</Title>}

        <div className="mt-8 grid grid-cols-2 gap-2">
            <Button onClick={handleOnCancel} color="default">Cancelar</Button>
            <Button onClick={handleOnConfirm} color="primary">{config?.action ?? 'Confirmar'}</Button>
        </div>
    </Modal>;

    return {confirm, modal}
}
