import { useCallback, useEffect } from "react";

function useWindowScroll(callback: (e: any) => void) {
    const handleScroll = useCallback((e: any) => {
        callback(e);
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