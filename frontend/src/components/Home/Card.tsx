import {FC, PropsWithChildren, ReactElement} from "react";
import classNames from "classnames";


const CardTitle: FC<PropsWithChildren> = ({children}) => {
    return (
        <h2 className="text-3xl pb-4 inline-block self-center">
            {children}
        </h2>
    );
};

interface CardContentProps extends PropsWithChildren {
    textAlign: "left" | "center" | "right"
}

const CardContent: FC<CardContentProps> = (
    {
        children,
        textAlign
    }
) => {
    return (
        <div className={classNames(
            "text-lg",
            `text-${textAlign}`
        )}>
            {children}
        </div>
    )
}

interface CardProps extends PropsWithChildren {
    callToAction?: string,
    className?: string
}

const Card: FC<CardProps> = (
    {
        children,
        callToAction,
        className
    }
) => {
    const addLink = (component: ReactElement) => {
        return (
            <a href={callToAction}>{component}</a>
        )
    }

    const card = (
        <div
            className={classNames(
                "p-8 rounded-xl shadow-xl bg-slate-800 text-slate-300 relative z-10 transition duration-500 flex flex-col justify-between h-full",
                className,
                {
                    "hover:scale-105": callToAction !== undefined
                }
            )}
        >
            {children}
        </div>
    );

    return callToAction ? addLink(card) : card;
};

export {
    Card,
    CardTitle,
    CardContent,
};
export default Card;