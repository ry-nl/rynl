'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

import Landing from './components/Home/Landing'

export default function Home() {
    const [doneSplash, setDoneSplash] = useState(false)

    return (
        <main>
            {!doneSplash ? (
                <motion.div
                    className="fixed flex justify-center items-center w-screen h-[120vh] overflow-hidden bg-dark"
                    initial={{ y: '-10vh' }}
                    animate={{ y: '-130vh' }}
                    transition={{ delay: 1, duration: 1, ease: 'anticipate' }}
                    onAnimationComplete={() => setDoneSplash(true)}
                >
                    <div className="text-3xl text-white font-extralight">
                        <h1 className="mb-4">ryan lee ©</h1>
                        <h1>software developer</h1>
                    </div>
                </motion.div>
            ) : (
                <Landing />
            )}
        </main>
    )
}
