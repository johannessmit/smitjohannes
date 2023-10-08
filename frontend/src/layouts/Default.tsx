import {FC, PropsWithChildren} from "react";
import {Maybe, MenuEntityResponse} from "@/gql/graphql";
import Header from "@/components/Header/Header";
import Logo from "@/components/Header/Logo";
import SocialMedia from "@/components/Header/SocialMedia";
import Menu from "@/components/Menu/Menu";

interface DefaultProps extends PropsWithChildren {
    menuItems: Maybe<MenuEntityResponse>|undefined
}

const Default: FC<DefaultProps> = (
    {
        menuItems,
        children
    }
) => {
    return (
        <>
            <Header>
                <Logo>J-Spijkerman</Logo>
                <Menu menu={menuItems} />
                <SocialMedia className="hidden md:flex gap-8 items-center" />
            </Header>
            {children}
        </>
    )
};

export default Default;