import React, {useEffect} from 'react';

export default function useAsync(callback: () => void) {
    useEffect(() => {
        callback()
    }, []);
}
