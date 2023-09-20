'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import MenuIcon from '@mui/icons-material/Menu'

export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false)

    return (
        <nav className="fixed top-8 right-8 z-50">
            {/* <motion.div
                onClick={() => setNavOpen(false)}
                className="flex justify-center items-center bg-white rounded-full w-20 h-20"
            >
                <MenuIcon className="drop-shadow-lg" />
            </motion.div> */}
        </nav>
    )
}
