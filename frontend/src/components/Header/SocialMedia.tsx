import GithubIcon from "@/components/Icons/GithubIcon";
import LinkedInIcon from "@/components/Icons/LinkedInIcon";
import {FC} from "react";
import classNames from "classnames";

interface SocialMediaProps {
    className: string
}

const SocialMedia: FC<SocialMediaProps> = (
    {
        className
    }
) => {
    return (
        <div
            className={classNames(
                className
            )}
        >
            <a href="#">
                <GithubIcon
                    className="w-6 h-6 transition duration-300 opacity-80 hover:scale-150 hover:opacity-100"
                />
            </a>
            <a href="#">
                <LinkedInIcon
                    className="w-6 h-6 fill-white transition duration-300 opacity-80 hover:scale-150 hover:opacity-100"
                />
            </a>
        </div>
    );
};

export default SocialMedia;