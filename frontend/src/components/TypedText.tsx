"use client";

import { useEffect, useState } from "react";

interface TypedTextProps {
    descriptions: Array<string>
    interval: number
};

const TypedText = ({
    descriptions,
    interval
}: TypedTextProps) => {
    const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
    const [renderedDescription, setRenderedDescription] = useState("");
    const [delta, setDelta] = useState(500);
    const [isDeleting, setIsDeleting] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

    const tick = () => {
        const fullText = descriptions[currentDescriptionIndex % descriptions.length];

        setRenderedDescription(isDeleting
            ? fullText.substring(0, renderedDescription.length - 1)
            : fullText.substring(0, renderedDescription.length + 1)
        );

        let delta = 100;

        if (isDeleting) {
            delta /= 2;
        }

        if (!isDeleting && renderedDescription === fullText) {
            delta = interval;
            setIsDeleting(true);
        } else if (isDeleting && renderedDescription === "") {
            setIsDeleting(false);
            setCurrentDescriptionIndex(currentDescriptionIndex + 1);
            delta = 500;
        }

        setDelta(delta);
    };

    useEffect(() => {
        const id = setTimeout(tick, delta);
        setTimeoutId(id);

        return () => clearTimeout(timeoutId);
    }, [currentDescriptionIndex, renderedDescription, isDeleting]);


    return (
        <span>{renderedDescription}<span className="animate-pulse bg-transparent pl-2 border-r-4 border-r-white"></span></span>
    );
};

export default TypedText;