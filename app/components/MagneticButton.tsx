'use client'
import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    strength?: number
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}

export function MagneticButton({
    children,
    className,
    strength = 0.28,
    onMouseEnter,
    onMouseLeave,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springConfig = { damping: 12, stiffness: 120, mass: 0.1 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            x.set((e.clientX - centerX) * strength)
            y.set((e.clientY - centerY) * strength)
        },
        [x, y, strength]
    )

    const handleMouseLeave = useCallback(() => {
        x.set(0)
        y.set(0)
        onMouseLeave?.()
    }, [x, y, onMouseLeave])

    const handleMouseEnter = useCallback(() => {
        onMouseEnter?.()
    }, [onMouseEnter])

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY, display: 'inline-block' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className={className}
        >
            {children}
        </motion.div>
    )
}
