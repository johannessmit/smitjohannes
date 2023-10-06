"use client";

import React, {createContext, FunctionComponent, PropsWithChildren, useState} from 'react';

interface DarkModeContextInterface {
    darkMode: boolean
    toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextInterface>({
    darkMode: false,
    toggleDarkMode: () => {}
});

const DarkModeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const preferredColorSchemeQuery = typeof window !== "undefined"
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null;
    const prefersDarkMode = () => preferredColorSchemeQuery?.matches ?? false;

    const [darkMode, setDarkMode] = useState(prefersDarkMode());
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    preferredColorSchemeQuery?.addEventListener('change', () => toggleDarkMode());

    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
};

export {DarkModeContext, DarkModeProvider};
