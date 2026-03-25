'use client'
import { motion } from 'framer-motion'
import { Menu, Circle } from '@mui/icons-material'
import { usePageTransition } from './PageTransition'
import { useCursor } from './Cursor'

interface NavLink {
    label: string
    href: string
}

interface NavSidebarProps {
    navModalOpen: boolean
    setNavModalOpen: (open: boolean) => void
    links: NavLink[]
}

export default function NavSidebar({
    navModalOpen,
    setNavModalOpen,
    links,
}: NavSidebarProps) {
    const { navigateTo, scrollToTop } = usePageTransition()
    const { setCursorVariant } = useCursor()

    return (
        <>
            {/* Floating menu button — always visible */}
            <motion.div
                id="nav-button"
                className="fixed flex justify-center items-center top-8 right-8 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg z-20 cursor-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,1)' }}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={() => setCursorVariant('default')}
                onClick={() => setNavModalOpen(true)}
            >
                <Menu sx={{ fontSize: '1.25rem' }} />
            </motion.div>

            {/* Sidebar panel */}
            <motion.div
                className="fixed top-0 right-0 w-full sm:w-1/2 lg:w-1/3 h-screen bg-dark text-white font-light shadow-2xl z-30"
                initial={{ x: '100%' }}
                animate={{ x: navModalOpen ? '0%' : '100%' }}
                transition={{ ease: 'circOut' }}
            >
                <nav className="flex flex-col justify-center gap-12 sm:gap-16 lg:gap-24 w-full h-full p-10 sm:p-16 lg:p-24 text-3xl sm:text-4xl font-thin">
                    {links.map((item) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            className="flex gap-4 items-center w-fit cursor-none"
                            onMouseEnter={() => setCursorVariant('link')}
                            onMouseLeave={() => setCursorVariant('default')}
                            whileHover={{
                                translateX: 10,
                                transition: { duration: 0.2 },
                            }}
                            onClick={(e) => {
                                e.preventDefault()
                                setNavModalOpen(false)
                                navigateTo(item.href)
                            }}
                        >
                            <Circle sx={{ fontSize: '0.5rem' }} /> {item.label}
                        </motion.a>
                    ))}
                    <motion.a
                        href="#"
                        className="flex gap-4 items-center w-fit cursor-none"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('default')}
                        whileHover={{
                            translateX: 10,
                            transition: { duration: 0.2 },
                        }}
                        onClick={(e) => {
                            e.preventDefault()
                            setNavModalOpen(false)
                            scrollToTop()
                        }}
                    >
                        <Circle sx={{ fontSize: '0.5rem' }} /> BACK TO TOP
                    </motion.a>
                </nav>
            </motion.div>

            {/* Dark backdrop overlay */}
            {navModalOpen && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-screen bg-black/30 z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setNavModalOpen(false)}
                />
            )}
        </>
    )
}
