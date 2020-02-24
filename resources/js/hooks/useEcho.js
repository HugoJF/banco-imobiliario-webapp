import {useEffect, useRef} from "react";

export default function useEcho(channel, event, handler, publicChannel = false) {
    const handlerRef = useRef(null);

    handlerRef.current = handler;

    useEffect(() => {
        if (channel)
            Echo[publicChannel ? 'channel' : 'private'](channel)
                .listen(event, handlerRef.current);
        return () => {
            if (channel)
                Echo.leave(channel);
        }
    }, [channel]);
}
