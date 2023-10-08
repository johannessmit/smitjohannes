import {FC, PropsWithChildren} from "react";

const Logo: FC<PropsWithChildren> = ({children}) => {
    return (
        <div
            className="text-2xl md:text-3xl font-bold tracking-widest transition duration-300 opacity-90 hover:scale-110 hover:opacity-100"
        >
            <a href="/">
                {children}
            </a>
        </div>
    );
};

export default Logo;