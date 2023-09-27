"use client";

import { Maybe, MenuEntityResponse } from "@/gql/graphql";
import useWindowScroll from "@/hooks/useWindowScroll";
import classNames from "classnames";
import { useState } from "react";

type MenuProps = {
    menu?: Maybe<MenuEntityResponse>
};

const Menu = ({
    menu
}: MenuProps) => {
    const [fade, setFade] = useState(false);
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    useWindowScroll((e) => {
        setScrollPosition(e.currentTarget.scrollY);
        setFade(e.currentTarget.scrollY > scrollPosition);
    });

    return (
        <header className={classNames(
            "flex w-100 items-center justify-between px-4 fixed top-0 left-0 right-0 transition-opacity duration-500 bg-gradient-to-b from-black z-10",
            {
                'opacity-0': fade
            }
        )}>
            <div className="text-xl font-bold tracking-widest" onClick={() => setFade(!fade)}>
                <a href="/">J-Spijkerman</a>
            </div>
            <nav>
                {menu?.data?.attributes?.pages?.data?.map(({ id, attributes }) => {
                    return (
                        <a
                            key={id}
                            href={`${attributes?.slug}`}
                            className="text-l inline-block font-semibold transition duration-300 tracking-wider opacity-80 p-4 hover:font-bold hover:scale-125 hover:opacity-100"
                        >
                            {attributes?.title}
                        </a>
                    );
                })}
            </nav>
            <div>
                (G) (L)
            </div>
        </header>
    );
};

export default Menu;