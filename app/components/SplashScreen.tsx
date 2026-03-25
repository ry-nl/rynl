'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MINIMUM_DISPLAY_MS = 1200

export default function SplashScreen() {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        // Wait for minimum display time + next idle callback (hydration done)
        const start = Date.now()

        const dismiss = () => {
            const elapsed = Date.now() - start
            const remaining = Math.max(0, MINIMUM_DISPLAY_MS - elapsed)
            setTimeout(() => setVisible(false), remaining)
        }

        // Use requestIdleCallback if available, else fallback to rAF
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(dismiss)
        } else {
            requestAnimationFrame(() => requestAnimationFrame(dismiss))
        }
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="splash"
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-dark"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.div
                        className="flex flex-col items-center gap-4"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                    >
                        <span className="text-white/80 text-sm tracking-[0.3em] uppercase font-light">
                            Ryan Lee
                        </span>
                        <motion.div
                            className="w-8 h-[1px] bg-white/30"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
