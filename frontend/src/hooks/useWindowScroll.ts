import { useEffect } from "react";

function useWindowScroll(callback: (e: any) => void) {
    const handleScroll = (e: any) => {
        callback(e);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [callback]);
}

export default useWindowScroll;