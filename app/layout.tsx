import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// components
// import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

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
            <body className={inter.className}>{children}</body>
        </html>
    )
}
