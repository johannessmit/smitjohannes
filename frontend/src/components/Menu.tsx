"use client";

import { Maybe, MenuEntityResponse } from "@/gql/graphql";
import classNames from "classnames";
import { useState } from "react";

type MenuProps = {
    menu?: Maybe<MenuEntityResponse>
};

const Menu = ({
    menu
}: MenuProps) => {
    const [fade, setFade] = useState(false);

    return (
        <header className={classNames(
            "flex w-100 items-center justify-between p-4 sticky top-0 transition-opacity",
            {
                'opacity-0': fade
            }
        )}>
            <div className="text-xl font-bold tracking-widest" onClick={() => setFade(!fade)}>
                <a href="/">J-Spijkerman</a>
            </div>
            <nav>
                {menu?.data?.attributes?.pages?.data?.filter(({ attributes }) => attributes?.slug !== 'home')?.map(({ id, attributes }) => {
                    return (
                        <a
                            key={id}
                            href={`${attributes?.slug}`}
                            className="text-l font-semibold tracking-wider p-4"
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