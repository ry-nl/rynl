'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
    return (
        <nav
            id="nav-container"
            className="absolute top-0 h-12 w-1/2 font-light text-base pr-24"
        >
            <motion.ul
                id="link-container"
                className="flex justify-between items-center h-full"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.li
                    whileHover={{ y: 4, opacity: 0.5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href="work">
                        <h1 className="">Work</h1>
                    </Link>
                </motion.li>
                <motion.li
                    whileHover={{ y: 4, opacity: 0.5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href="about">
                        <h1 className="">About</h1>
                    </Link>
                </motion.li>
                <motion.li
                    whileHover={{ y: 4, opacity: 0.5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href="contact">
                        <h1 className="">Contact</h1>
                    </Link>
                </motion.li>
            </motion.ul>
        </nav>
        // <nav className="flex justify-center w-screen my-5">
        //     <span className="flex justify-between w-screen h-10 px-10 font-light">
        //         <motion.button
        //             whileHover={{ y: 3 }}
        //             initial={{ opacity: 0 }}
        //             animate={{ opacity: 1 }}
        //             transition={{
        //                 opacity: { delay: 0.6 },
        //                 y: { duration: 0.1 },
        //             }}
        //         >
        //             <Link href="/">
        //                 <h1>ryan lee ©</h1>
        //             </Link>
        //         </motion.button>
        //         <motion.button
        //             whileHover={{ y: 3 }}
        //             initial={{ opacity: 0 }}
        //             animate={{ opacity: 1 }}
        //             transition={{
        //                 opacity: { delay: 0.9 },
        //                 y: { duration: 0.1 },
        //             }}
        //         >
        //             <Link href="/work">
        //                 <h1>work</h1>
        //             </Link>
        //         </motion.button>
        //         <motion.button
        //             whileHover={{ y: 3 }}
        //             initial={{ opacity: 0 }}
        //             animate={{ opacity: 1 }}
        //             transition={{
        //                 opacity: { delay: 1.2 },
        //                 y: { duration: 0.1 },
        //             }}
        //         >
        //             <Link href="/about">
        //                 <h1>about</h1>
        //             </Link>
        //         </motion.button>
        //         <motion.button
        //             whileHover={{ y: 3 }}
        //             initial={{ opacity: 0 }}
        //             animate={{ opacity: 1 }}
        //             transition={{
        //                 opacity: { delay: 1.5 },
        //                 y: { duration: 0.1 },
        //             }}
        //         >
        //             <Link href="contact">
        //                 <h1>contact</h1>
        //             </Link>
        //         </motion.button>
        //     </span>
        // </nav>
    )
}
