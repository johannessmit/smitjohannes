"use client";

import {FC, useState} from "react";
import {ArrowDownIcon} from "@heroicons/react/24/solid";
import useWindowScroll from "@/hooks/useWindowScroll";
import classNames from "classnames";

const ScrollTo: FC = () => {
    const [direction, setDirection] = useState<"bottom"|"top">("bottom");
    const scrollHeight = document.body.scrollHeight;
    const viewHeight = document.documentElement.clientHeight;
    const handleClick = () => {
        const y = direction === "bottom" ? scrollHeight : 0;

        window.scrollTo({
            left: window.scrollX,
            top: y,
            behavior: "smooth"
        });
    }

    useWindowScroll((prevScrollPosition, scrollPosition) => {
        if (scrollHeight - scrollPosition.y === viewHeight) {
            setDirection("top");
            return;
        }

        if (scrollPosition.y === 0) {
            setDirection("bottom");
            return;
        }

        if (prevScrollPosition.y < scrollPosition.y) {
            setDirection("bottom");
        } else {
            setDirection("top");
        }
    });

    return (
        <div
            className="fixed md:hidden w-10 h-10 p-2 bg-gray-800 rounded shadow opacity-90 bottom-2 right-2 z-50 cursor-pointer"
            onClick={() => handleClick()}
        >
            <ArrowDownIcon
                className={classNames(
                    "transition duration-500",
                    {
                        "rotate-180": direction === "top"
                    }
                )}
            />
        </div>
    );
}

export default ScrollTo;