import {useEffect, useRef} from "react";

type refType<T> = (e: T) => void;

export default function useEcho<T>(channel: string|null, event: string, handler: (e: T) => void, publicChannel = false) {
    const handlerRef = useRef<refType<T>>(handler);

    useEffect(() => {
        if (channel) {
            console.log(`Joining channel ${channel}`);

            window
                .Echo[publicChannel ? 'channel' : 'private'](channel)
                .listen(event, handlerRef.current);
        }
        return () => {
            if (channel) {
                console.log(`Leaving channel ${channel}`);

                window.Echo.leave(channel);
            }
        }
    }, [channel]);
}
