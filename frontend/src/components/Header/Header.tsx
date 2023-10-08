"use client";

import classNames from "classnames";
import useWindowScroll from "@/hooks/useWindowScroll";
import {FC, PropsWithChildren, useState} from "react";

const Header: FC<PropsWithChildren> = ({ children }) => {
    const [fade, setFade] = useState(false);

    useWindowScroll((prevScrollPosition, scrollPosition) => {
        setFade(scrollPosition.y > prevScrollPosition.y);
    });

    return (
        <header className={classNames(
            "flex w-100 items-center justify-between px-6 py-4 md:py-0 fixed top-0 left-0 right-0 transition-opacity duration-500 bg-gradient-to-b from-gray-900 z-30",
            {
                'opacity-0': fade
            }
        )}>
            {children}
        </header>
    );
}

export default Header;