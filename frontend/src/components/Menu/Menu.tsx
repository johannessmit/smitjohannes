"use client";

import {Maybe, MenuEntityResponse} from "@/gql/graphql";
import MobileMenu from "@/components/Menu/MobileMenu";

export type MenuProps = {
    menu?: Maybe<MenuEntityResponse>
};

const Menu = (
    {
        menu
    }: MenuProps
) => {
    return (
        <>
                <nav className="hidden md:block">
                    {menu?.data?.attributes?.pages?.data?.map(({id, attributes}) => {
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
                <MobileMenu menu={menu} />
        </>
    );
};

export default Menu;