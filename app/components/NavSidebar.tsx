'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Close, ChevronLeft, ChevronRight } from '@mui/icons-material'
import { usePageTransition } from './PageTransition'
import { useCursor } from './Cursor'
import { usePathname } from 'next/navigation'

const PAGE_ORDER = [
    { label: 'HOME', href: '/' },
    { label: 'WORK', href: '/work' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
]

/* eslint-disable @typescript-eslint/no-explicit-any */
const linkVariants: any = {
    hidden: { opacity: 0, x: 60 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.1 + i * 0.08,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
    exit: (i: number) => ({
        opacity: 0,
        x: 40,
        transition: {
            delay: i * 0.04,
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
}

export default function NavSidebar() {
    const { navigateTo, navModalOpen, setNavModalOpen } = usePageTransition()
    const { setCursorVariant } = useCursor()
    const pathname = usePathname()

    const currentIndex = PAGE_ORDER.findIndex((p) => p.href === pathname)
    const prevPage = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null
    const nextPage = currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null

    const navKey = `${prevPage?.href ?? 'none'}-${nextPage?.href ?? 'none'}`

    return (
        <>
            {/* Prev / Next page buttons */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={navKey}
                    className="fixed top-8 left-8 right-8 flex justify-between items-center z-20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    {prevPage ? (
                        <button
                            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-dark/60 backdrop-blur-sm border border-dark/10 text-white/80 text-xs font-light tracking-widest cursor-none hover:bg-dark/80 hover:text-white transition-colors duration-300 pointer-events-auto shadow-sm"
                            onMouseEnter={() => setCursorVariant('link')}
                            onMouseLeave={() => setCursorVariant('default')}
                            onClick={() => navigateTo(prevPage.href)}
                        >
                            <ChevronLeft sx={{ fontSize: '0.9rem' }} />
                            {prevPage.label}
                        </button>
                    ) : (
                        <div />
                    )}

                    {nextPage ? (
                        <button
                            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-dark/60 backdrop-blur-sm border border-dark/10 text-white/80 text-xs font-light tracking-widest cursor-none hover:bg-dark/80 hover:text-white transition-colors duration-300 pointer-events-auto shadow-sm"
                            onMouseEnter={() => setCursorVariant('link')}
                            onMouseLeave={() => setCursorVariant('default')}
                            onClick={() => navigateTo(nextPage.href)}
                        >
                            {nextPage.label}
                            <ChevronRight sx={{ fontSize: '0.9rem' }} />
                        </button>
                    ) : (
                        <div />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Hamburger menu — center right, semicircle tab */}
            <motion.div
                id="nav-button"
                className="fixed right-0 top-1/2 -translate-y-1/2 z-20 cursor-none mix-blend-difference"
                initial={false}
                animate={{ opacity: navModalOpen ? 0 : 1, x: navModalOpen ? 20 : 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <motion.button
                    className="group relative flex items-center justify-center w-7 h-14 rounded-l-full cursor-none bg-white/80 hover:w-9 transition-all duration-300 ease-out"
                    onMouseEnter={() => setCursorVariant('link')}
                    onMouseLeave={() => setCursorVariant('default')}
                    onClick={() => setNavModalOpen(true)}
                >
                    {/* Breathing pulse ring */}
                    <span className="absolute inset-0 rounded-l-full bg-white/40 nav-pulse" />
                    <Menu sx={{ fontSize: '0.85rem' }} className="relative z-10 text-black/70 group-hover:text-black transition-colors duration-300" />
                </motion.button>
            </motion.div>

            {/* Full-screen nav overlay */}
            <AnimatePresence>
                {navModalOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-30 cursor-none"
                            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            onClick={() => setNavModalOpen(false)}
                        />

                        {/* Panel */}
                        <motion.div
                            className="fixed top-0 right-0 w-full sm:w-[420px] h-screen z-40 overflow-hidden"
                            initial={{ x: '100%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            {/* Background with blur — pointer-events-none so it doesn't block clicks */}
                            <div className="absolute inset-0 bg-dark/95 backdrop-blur-xl pointer-events-none" />

                            {/* Decorative accent line */}
                            <motion.div
                                className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            />

                            {/* Close button — z-20 to sit above the full-height nav */}
                            <motion.button
                                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/50 cursor-none hover:text-white hover:border-white/30 transition-colors duration-300 z-20"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                onMouseEnter={() => setCursorVariant('link')}
                                onMouseLeave={() => setCursorVariant('default')}
                                onClick={() => setNavModalOpen(false)}
                            >
                                <Close sx={{ fontSize: '1rem' }} />
                            </motion.button>

                            {/* Navigation links */}
                            <nav className="relative z-10 flex flex-col justify-center h-full px-12 sm:px-16">
                                <div className="flex flex-col gap-2">
                                    {PAGE_ORDER.map((item, i) => {
                                        const isCurrent = item.href === pathname
                                        return (
                                            <motion.a
                                                key={item.label}
                                                href={item.href}
                                                custom={i}
                                                variants={linkVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className={`group relative flex items-center gap-5 py-4 cursor-none ${
                                                    isCurrent ? 'pointer-events-none' : ''
                                                }`}
                                                onMouseEnter={() => !isCurrent && setCursorVariant('link')}
                                                onMouseLeave={() => setCursorVariant('default')}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    if (!isCurrent) {
                                                        setNavModalOpen(false)
                                                        navigateTo(item.href)
                                                    }
                                                }}
                                            >
                                                <span
                                                    className={`text-xs font-light tracking-wider tabular-nums transition-colors duration-300 ${
                                                        isCurrent
                                                            ? 'text-white/80'
                                                            : 'text-white/25 group-hover:text-white/50'
                                                    }`}
                                                >
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>

                                                <span
                                                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                                                        isCurrent
                                                            ? 'bg-white scale-100'
                                                            : 'bg-white/20 scale-75 group-hover:bg-white/50 group-hover:scale-100'
                                                    }`}
                                                />

                                                <span
                                                    className={`text-3xl sm:text-4xl font-thin tracking-wide transition-all duration-300 ${
                                                        isCurrent
                                                            ? 'text-white'
                                                            : 'text-white/40 group-hover:text-white group-hover:translate-x-2'
                                                    }`}
                                                >
                                                    {item.label}
                                                </span>

                                                {isCurrent && (
                                                    <motion.div
                                                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-white/30 to-transparent"
                                                        layoutId="activeIndicator"
                                                        initial={{ scaleX: 0, originX: 0 }}
                                                        animate={{ scaleX: 1 }}
                                                        transition={{
                                                            delay: 0.3 + i * 0.08,
                                                            duration: 0.5,
                                                            ease: [0.25, 0.46, 0.45, 0.94],
                                                        }}
                                                    />
                                                )}
                                            </motion.a>
                                        )
                                    })}
                                </div>

                                <motion.div
                                    className="absolute bottom-10 left-12 sm:left-16 right-12 sm:right-16 flex justify-between items-end text-white/20 text-xs font-light tracking-wider"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                >
                                    <span>NAVIGATION</span>
                                    <span>{String(currentIndex + 1).padStart(2, '0')} / {String(PAGE_ORDER.length).padStart(2, '0')}</span>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
