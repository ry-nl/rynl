'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

import { Menu, Circle } from '@mui/icons-material'

import Experience from '../components/Work/Experience'

import { ExperienceData } from '../components/Work/ProjectData'

export default function Work() {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        // playback speed
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.4
        }
    })

    const [navModalOpen, setNavModalOpen] = useState(false)

    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    })
    const [cursorVariant, setCursorVariant] = useState('defaultDark')

    useEffect(() => {
        const mouseMove = (e: any) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            })
        }

        window.addEventListener('mousemove', mouseMove)

        return () => {
            window.removeEventListener('mousemove', mouseMove)
        }
    }, [])

    const cursorVariants = {
        defaultLight: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
        },
        defaultDark: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            backgroundColor: '#111111',
        },
        link: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            width: 32,
            height: 32,
            backgroundColor: '#2d86fa',
        },
    }

    const smallCursorVariants = {
        defaultLight: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
        },
        defaultDark: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            backgroundColor: '#111111',
        },
        link: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            width: 24,
            height: 24,
            backgroundColor: '#2d86fa',
        },
    }
    return (
        <main className="absolute bg-light text-4xl font-sans text-white">
            <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                loop
                className="fixed top-0 left-0 w-full h-[120vh] object-cover contrast-[90%] brightness-[40%] grayscale-[25%] blur-sm
 -z-100 scale-125"
            >
                <source
                    src="/workSectionBackgroundVideo.mp4"
                    type="video/mp4"
                />
            </video>
            <motion.div
                className="cursor"
                variants={cursorVariants}
                animate={cursorVariant}
                transition={{
                    duration: 0,
                }}
            />
            <motion.div
                className="small-cursor flex justify-center items-center"
                variants={smallCursorVariants}
                animate={cursorVariant}
                transition={{
                    duration: 0.1,
                    ease: 'easeOut',
                }}
            />
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
                className="fixed top-0 right-0 w-1/3 h-screen bg-dark text-white font-light shadow-2xl z-30"
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

            <div onClick={() => setNavModalOpen(false)}>
                <div id="work-header" className="flex items-center p-12">
                    <h1 className="text-2xl font-thin z-0">WORK EXPERIENCE</h1>
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
                {/* <div
                id="project-header"
                className="flex items-center p-12 border-t"
            >
                <h1 className="text-4xl font-thin">PROJECTS</h1>
            </div>
            <div id="project-container">
                {ProjectData.map((project, index) => (
                    <Project
                        key={index}
                        order={index + 1}
                        name={project.name}
                        company={project.company}
                        position={project.position}
                        tools={project.tools}
                        description={project.description}
                        accomplishments={project.accomplishments}
                        image={project.image}
                    />
                ))}
            </div>
            <div className="flex justify-center items-center w-full h-48 border-t">
                <div
                    id="more-work-button-container"
                    className="flex justify-center w-full h-fit font-thin tracking-wide text-xl"
                >
                    <div
                        onMouseEnter={() => {
                            setCursorVariant('link')
                        }}
                        onMouseLeave={() => {
                            setCursorVariant('defaultDark')
                        }}
                    >
                        <SlideButtonDarkUp
                            buttonText="MORE WORK"
                            link="https://github.com/ry-nl"
                            popupText="→"
                        />
                    </div>
                </div>
            </div> */}
            </div>
        </main>
    )
}
