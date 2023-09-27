import type { ISourceOptions } from "tsparticles-engine";

const options: ISourceOptions = {
    name: "Plasma",
    background: {
        color: {
            value: "#000000",
        },
    },
    particles: {
        number: {
            value: 150,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 0,
        },
        links: {
            enable: true,
            distance: 110,
            color: "#ff8800",
            opacity: 0.4,
            width: 2,
        },
        move: {
            enable: true,
            speed: 1,
            outModes: "bounce",
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse",
            },
        },
        modes: {
            repulse: {
                distance: 150,
                duration: 0.4,
            },
        },
    },
    detectRetina: true,
    fullScreen: false,
};

export default options;