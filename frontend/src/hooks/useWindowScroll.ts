import {useCallback, useEffect, useState} from "react";

interface scrollState {
    x: number,
    y: number
}

const useWindowScroll = (callback: (prevScrollPosition: scrollState, scrollPosition: scrollState) => void) => {
    const [scrollPosition, setScrollPosition] = useState<scrollState>({
        x: window.scrollX,
        y: window.scrollY
    });

    const handleScroll = useCallback((e: any) => {
        const newScrollPosition = {
            x: e.currentTarget.scrollX,
            y: e.currentTarget.scrollY
        };

        callback(scrollPosition, newScrollPosition);
        setScrollPosition(newScrollPosition);
    }, [callback]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window?.addEventListener("scroll", handleScroll, true);
        }

        return () => {
            if (typeof window !== "undefined") {
                window?.removeEventListener("scroll", handleScroll);
            }
        };
    }, [handleScroll]);
}

export default useWindowScroll;