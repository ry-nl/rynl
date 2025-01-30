'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

import { Menu, Circle } from '@mui/icons-material'

import Experience from '../components/Work/Experience'
import Cursor from '../components/Cursor'
import { SlideButtonLightRight } from '../components/Buttons'

import { ExperienceData } from '../data/work/ProjectData'

export default function Work() {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        // playback speed
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.4
        }
    })

    const [navModalOpen, setNavModalOpen] = useState(false)

    const [cursorVariant, setCursorVariant] = useState('defaultLight')

    return (
        <main className="absolute bg-light text-4xl font-sans text-white">
            <Cursor cursorVariant={cursorVariant} />
            <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                loop
                className="fixed -z-0 top-0 left-0 w-full h-[120vh] object-cover contrast-[90%] brightness-[40%] grayscale-[25%] blur-sm
 -z-100 scale-125"
            >
                <source
                    src="/workSectionBackgroundVideo720.mp4"
                    type="video/mp4"
                />
            </video>
            <motion.div
                id="nav-button"
                className="fixed flex justify-center items-center top-12 right-12 w-20 h-20 bg-white rounded-full shadow-xl z-10"
                whileHover={{
                    scale: 1.1,
                }}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={() => setCursorVariant('defaultDark')}
                onClick={() => setNavModalOpen(true)}
            >
                <Menu className="z-20 text-black" />
            </motion.div>
            <motion.div
                className="fixed top-0 right-0 w-1/3 h-screen bg-dark text-white font-light shadow-2xl z-20"
                initial={{ x: '100%' }}
                animate={{
                    x: navModalOpen ? '0%' : '100%',
                }}
                transition={{ ease: 'circOut' }}
                onMouseEnter={() => setCursorVariant('defaultLight')}
                onMouseLeave={() => setCursorVariant('defaultDark')}
            >
                <div className="flex flex-col justify-center gap-24 w-full h-full p-24 text-4xl font-thin">
                    <motion.a
                        href={'/'}
                        className="flex gap-4 items-center w-fit cursor-none"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('defaultLight')}
                        whileHover={{
                            translateX: 10,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <Circle className="w-[8px] h-[8px]" /> HOME
                    </motion.a>
                    <motion.a
                        href={'/about'}
                        className="flex gap-4 items-center w-fit cursor-none"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('defaultLight')}
                        whileHover={{
                            translateX: 10,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <Circle className="w-[8px] h-[8px]" /> ABOUT
                    </motion.a>
                    <motion.a
                        href={'/contact'}
                        className="flex gap-4 items-center w-fit cursor-none"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('defaultLight')}
                        whileHover={{
                            translateX: 10,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <Circle className="w-[8px] h-[8px]" /> CONTACT
                    </motion.a>
                    <motion.a
                        href={'/'}
                        className="flex gap-4 items-center w-fit cursor-none"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('defaultLight')}
                        whileHover={{
                            translateX: 10,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <Circle className="w-[8px] h-[8px]" /> BACK TO TOP
                    </motion.a>
                </div>
            </motion.div>
            {navModalOpen && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-screen bg-black/30 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setNavModalOpen(false)}
                />
            )}

            <div
                onClick={() => setNavModalOpen(false)}
                className="w-full h-full z-40"
            >
                <div className="flex w-100vw h-20vh p-12">
                    <h1 className="text-2xl font-thin z-40">WORK EXPERIENCE</h1>
                </div>
                <div id="work-container">
                    {ExperienceData.map((work, index) => (
                        <Experience
                            key={index}
                            company={work.company}
                            position={work.position}
                            dates={work.dates}
                            image={work.image}
                        />
                    ))}
                </div>
                <div
                    id="more-work-button-container"
                    className="flex py-16 font-thin tracking-wide text-xl text-black bg-dark"
                    onMouseEnter={() => {
                        setCursorVariant('link')
                    }}
                    onMouseLeave={() => {
                        setCursorVariant('defaultDark')
                    }}
                >
                    <SlideButtonLightRight
                        buttonText="MORE WORK"
                        link="https://github.com/ry-nl"
                        popupText="→"
                    />
                </div>
            </div>
        </main>
    )
}
