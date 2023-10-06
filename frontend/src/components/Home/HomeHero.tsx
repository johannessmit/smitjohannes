"use client";

import homeHero from "@/lib/tsParticles/homeHero";
import { useCallback } from "react";
import Particles from "react-particles";
import {Engine} from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import TypedText from "../TypedText";

interface HomeHeroProps {
    descriptions: Array<string>
}

const HomeHero = ({ descriptions }: HomeHeroProps) => {
    const particleInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <main className="flex min-h-screen w-screen items-center justify-center relative">
            <Particles
                id="tsparticles"
                init={particleInit}
                options={homeHero}
                className="absolute -z-10 h-screen top-0"
            />
            <div className="h-screen absolute z-0 top-0 bg-gradient-to-t from-gray-900 w-screen from-0% via-25% to-40%" />
            <h1 className="text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                <TypedText descriptions={descriptions} interval={2000} />
            </h1>
        </main>
    );
};

export default HomeHero;