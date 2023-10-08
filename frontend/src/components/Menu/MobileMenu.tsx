import {FC, useState} from "react";
import classNames from "classnames";
import {Transition} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import {createPortal} from "react-dom";
import {MenuProps} from "@/components/Menu/Menu";
import SocialMedia from "@/components/Header/SocialMedia";

const MobileMenu: FC<MenuProps> = (
    {
        menu
    }
) => {
    const [showMobile, setShowMobile] = useState(false);

    return (
        <div
            className="md:hidden"
        >
            <Bars3Icon
                className="w-8 h-8 cursor-pointer"
                onClick={() => setShowMobile(true)}
            />
            {createPortal(
                <Transition
                    show={showMobile}
                    enter="transition-transform duration-300 left-full top-0 h-screen w-screen z-50 fixed"
                    enterFrom="translate-x-0"
                    enterTo="-translate-x-full"
                    entered="fixed -translate-x-full z-50 left-full top-0 h-screen w-screen"
                    // leave="transition-transform duration-1000"
                    // leaveFrom="fixed -translate-x-full translate-y-full z-50 left-full -top-full h-screen w-screen"
                    // leaveTo="fixed translate-x-0 translate-y-0 z-50"
                >
                    <div
                        className={classNames(
                            "h-full w-full bg-gray-800 flex-col flex"
                        )}
                    >
                        <div className="place-self-end pt-4 pr-4">
                            <XMarkIcon
                                className="w-8 h-8 cursor-pointer"
                                onClick={() => setShowMobile(false)}
                            />
                        </div>
                        <nav className="flex flex-col">
                            {menu?.data?.attributes?.pages?.data?.map(({id, attributes}) => {
                                return (
                                    <a
                                        key={id}
                                        href={`${attributes?.slug}`}
                                        className="text-2xl inline-block font-semibold transition duration-300 tracking-wider opacity-80 p-4 border-b-2 last:border-b-0 border-gray-700"
                                    >
                                        {attributes?.title}
                                    </a>
                                );
                            })}
                        </nav>
                        <SocialMedia
                            className="flex gap-4 p-4 grow justify-end items-end"
                        />
                    </div>
                </Transition>,
                document.body
            )}
        </div>
    );
}

export default MobileMenu;