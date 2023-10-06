import './globals.css'
import type {Metadata} from 'next'
import {Roboto} from 'next/font/google'
import {ApolloWrapper} from '@/lib/apollo/ApolloWrapper'
import {ReactNode} from "react";
import {DarkModeProvider} from "@/context/DarkModeContext";

const roboto = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
    title: 'J-Spijkerman',
    description: '',
}

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
        <DarkModeProvider>
            <body className={`${roboto.className} relative text-slate-100 bg-gray-900`}>
            <ApolloWrapper>
                {children}
            </ApolloWrapper>
            </body>
        </DarkModeProvider>
        </html>
    )
}
