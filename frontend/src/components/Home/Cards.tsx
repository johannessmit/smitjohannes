import Card, {CardContent, CardTitle} from "@/components/Home/Card";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {ClipboardIcon, CodeBracketSquareIcon} from "@heroicons/react/24/outline";

const Cards = () => {
    return (
        <main
            className="grid grid-rows-1 grid-cols-3 gap-12 p-24 w-full items-center relative"
        >
            <Card callToAction={"/about-me"}>
                <CardTitle>
                    <UserCircleIcon className={"w-24 h-24"}/> Me
                </CardTitle>
                <CardContent textAlign={"left"}>
                    <table>
                        <tbody>
                            <tr>
                                <td className="font-bold pr-2">Name</td>
                                <td>Johannes Spijkerman</td>
                            </tr>
                            <tr>
                                <td className="font-bold pr-2">Profession</td>
                                <td>Sr. Software Developer</td>
                            </tr>
                            <tr>
                                <td className="font-bold pr-2">Location</td>
                                <td>Borne, NL</td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
            <Card>
                <CardTitle>
                    <ClipboardIcon className="w-24 h-24"/> Projects
                </CardTitle>
                <CardContent textAlign={"center"}>
                    <ul>
                        <li>smitjohannes.nl</li>
                        <li>bitdevelopment.nl</li>
                        <li>
                            <a href="/projects">And many more</a>
                        </li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardTitle>
                    <CodeBracketSquareIcon className="w-24 h-24"/> Worked with
                </CardTitle>
                <CardContent textAlign={"center"}>
                    <ul>
                        <li>Javascript (Typescript)</li>
                        <li>PHP (Laravel, Symfony)</li>
                        <li>NodeJS</li>
                        <li>Godot</li>
                    </ul>
                </CardContent>
            </Card>
        </main>

    )
};

export default Cards;