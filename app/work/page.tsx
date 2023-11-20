'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import Project from '../components/Work/Project'
import { ProjectData } from '../components/Work/ProjectData'
import { SlideButtonDarkUp, SlideButtonLightRight } from '../components/Buttons'

export default function Work() {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    })
    const [cursorVariant, setCursorVariant] = useState('defaultLight')

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
        <main className="bg-dark text-4xl font-sans font-light text-white">
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

            <div
                id="work-header"
                className="flex justify-between items-center px-12 py-4"
            >
                <h1 className="text-2xl">WORK</h1>
            </div>
            <div id="work-container">
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
            </div>
        </main>
    )
}
