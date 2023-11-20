'use client'
import { useState, useEffect } from 'react'

export default function About() {
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
        <main className="flex justify-center items-center w-full h-screen bg-dark text-4xl font-sans font-light text-white">
            <div className="flex justify-evenly w-full h-full">
                <div className="w-1/2"></div>
                <div className="w-1/2 text-xl">
                    Nice to meet you! My name is Ryan, I am a software engineer
                    based in Los Angeles, CA. I have experience in both startup
                    and large company settings, working with cutting-edge
                    technologies and collaborating with talented engineers to
                    create scalable and reliable end-to-end solutions. I have
                    gained valuable experience in developing and deploying
                    back-end services, designing intuitive front-end UIs, and
                    optimizing software performance and security. I pride myself
                    in prioritizing quality and developing with a user-first
                    approach, and am always eager to explore new opportunities
                    to grow as a software engineer. Thank you for stopping by my
                    page!
                </div>
            </div>
        </main>
    )
}
