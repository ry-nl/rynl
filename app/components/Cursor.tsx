import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Cursor({ cursorVariant }: { cursorVariant: string }) {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    })

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
        <motion.div>
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
        </motion.div>
    )
}
