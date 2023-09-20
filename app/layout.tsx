import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import { Figtree } from 'next/font/google'
import { DM_Sans } from 'next/font/google'
import { Montserrat } from 'next/font/google'
import { DM_Serif_Display } from 'next/font/google'

// components
import Navbar from './components/Navbar'

const neueMontreal = localFont({
    src: [
        {
            path: '../fonts/neue-montreal/PPNeueMontreal-Thin.otf',
            weight: '100',
        },
        {
            path: '../fonts/neue-montreal/PPNeueMontreal-Book.otf',
            weight: '300',
        },
        {
            path: '../fonts/neue-montreal/PPNeueMontreal-Medium.otf',
            weight: '500',
        },
        {
            path: '../fonts/neue-montreal/PPNeueMontreal-Bold.otf',
            weight: '700',
        },
    ],
    variable: '--font-neue-montreal',
})

export const dmSerif = DM_Serif_Display({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-dm-serif',
})

// const font = Montserrat({
//     subsets: ['latin'],
// })

export const metadata: Metadata = {
    title: 'Ryan Lee',
    description: 'Portfolio Page for Ryan Lee',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${neueMontreal.variable} ${dmSerif.variable}`}>
                {/* <Navbar /> */}
                {children}
            </body>
        </html>
    )
}
