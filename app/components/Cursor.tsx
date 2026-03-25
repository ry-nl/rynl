'use client'
import {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
    ReactNode,
} from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorVariant = 'default' | 'link'

interface CursorContextType {
    setCursorVariant: (variant: CursorVariant) => void
}

const CursorContext = createContext<CursorContextType>({
    setCursorVariant: () => {},
})

export function useCursor() {
    return useContext(CursorContext)
}

export function CursorProvider({ children }: { children: ReactNode }) {
    const [variant, setVariant] = useState<CursorVariant>('default')
    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)
    const [visible, setVisible] = useState(false)

    // Trailing cursor springs — lower damping/mass so it follows more closely
    const springConfig = { damping: 22, stiffness: 400, mass: 0.15 }
    const trailX = useSpring(mouseX, springConfig)
    const trailY = useSpring(mouseY, springConfig)

    const contextValue = useMemo(
        () => ({ setCursorVariant: setVariant }),
        [setVariant]
    )

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            if (!visible) setVisible(true)
        }
        window.addEventListener('mousemove', onMouseMove)
        return () => window.removeEventListener('mousemove', onMouseMove)
    }, [mouseX, mouseY, visible])

    const isLink = variant === 'link'

    return (
        <CursorContext.Provider value={contextValue}>
            {children}
            {/* Main cursor — instant, blend mode for auto contrast */}
            <motion.div
                className="fixed rounded-full pointer-events-none z-[999]"
                style={{
                    left: mouseX,
                    top: mouseY,
                    x: '-50%',
                    y: '-50%',
                    mixBlendMode: isLink ? 'normal' : 'difference',
                    opacity: visible ? 0.82 : 0,
                }}
                animate={{
                    width: isLink ? 32 : 20,
                    height: isLink ? 32 : 20,
                    backgroundColor: isLink ? '#2d86fa' : '#ffffff',
                }}
                transition={{ type: 'tween', duration: 0.15 }}
            />
            {/* Trailing cursor — springs behind, decorative */}
            <motion.div
                className="fixed rounded-full pointer-events-none z-[999]"
                style={{
                    left: trailX,
                    top: trailY,
                    x: '-50%',
                    y: '-50%',
                    mixBlendMode: isLink ? 'normal' : 'difference',
                    opacity: visible ? 0.65 : 0,
                }}
                animate={{
                    width: isLink ? 20 : 12,
                    height: isLink ? 20 : 12,
                    backgroundColor: isLink ? '#2d86fa' : '#ffffff',
                }}
                transition={{ type: 'tween', duration: 0.15 }}
            />
        </CursorContext.Provider>
    )
}
