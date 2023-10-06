"use client";

import { Maybe, MenuEntityResponse } from "@/gql/graphql";
import useWindowScroll from "@/hooks/useWindowScroll";
import classNames from "classnames";
import { useState } from "react";
import GithubIcon from "@/components/Icons/GithubIcon";
import LinkedInIcon from "@/components/Icons/LinkedInIcon";
import {Bars3Icon} from "@heroicons/react/24/solid";

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
            "flex w-100 items-center justify-between px-6 py-4 md:py-0 fixed top-0 left-0 right-0 transition-opacity duration-500 bg-gradient-to-b from-gray-900 z-10",
            {
                'opacity-0': fade
            }
        )}>
            <div
                className="text-2xl md:text-3xl font-bold tracking-widest transition duration-300 opacity-90 hover:scale-110 hover:opacity-100"
                onClick={() => setFade(!fade)}
            >
                <a href="/">J-Spijkerman</a>
            </div>
            <nav className="hidden md:block">
                {menu?.data?.attributes?.pages?.data?.map(({ id, attributes }) => {
                    return (
                        <a
                            key={id}
                            href={`${attributes?.slug}`}
                            className="text-xl inline-block font-semibold transition duration-300 tracking-wider opacity-80 p-4 hover:font-bold hover:scale-125 hover:opacity-100"
                        >
                            {attributes?.title}
                        </a>
                    );
                })}
            </nav>
            <div className="hidden md:flex gap-8 items-center">
                <a href="#">
                    <GithubIcon className="w-6 h-6 transition duration-300 opacity-80 hover:scale-150 hover:opacity-100"/>
                </a>
                <a href="#">
                    <LinkedInIcon className="w-6 h-6 fill-white transition duration-300 opacity-80 hover:scale-150 hover:opacity-100"/>
                </a>
            </div>
            <div className="md:hidden">
                <Bars3Icon className="w-8 h-8"/>
            </div>
        </header>
    );
};

export default Menu;