import {useEffect, useRef} from "react";

export default function useEcho(channel, event, handler, publicChannel = false) {
    const handlerRef = useRef(null);

    handlerRef.current = handler;

    useEffect(() => {
        if (channel) {
            console.log(`Joining channel ${channel}`);

            Echo[publicChannel ? 'channel' : 'private'](channel)
                .listen(event, handlerRef.current);
        }
        return () => {
            if (channel) {
                console.log(`Leaving channel ${channel}`);

                Echo.leave(channel);
            }
        }
    }, [channel]);
}
