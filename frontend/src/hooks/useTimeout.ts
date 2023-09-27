import { useEffect, useRef } from "react";

function useTimeout(callback: () => void, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => savedCallback.current();

        if (typeof delay === 'number') {
            timeoutRef.current = setTimeout(tick, delay);

            return () => clearTimeout(timeoutRef.current);
        }
    }, [delay]);
    return timeoutRef;
}

export default useTimeout;