'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import { KeyboardArrowDown } from '@mui/icons-material'
import { useCursor } from '../components/Cursor'
import { MagneticButton } from '../components/MagneticButton'
import NavSidebar from '../components/NavSidebar'
import { TransitionLink } from '../components/PageTransition'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    }),
}

const contactLinks = [
    {
        label: 'Email',
        value: 'rynldev@gmail.com',
        href: 'https://mail.google.com/mail/?view=cm&source=mailto&to=rynldev@gmail.com',
    },
    {
        label: 'Phone',
        value: '+1 702 626 3161',
        href: 'tel:+17026263161',
    },
    {
        label: 'LinkedIn',
        value: 'linkedin.com/in/ry-nl',
        href: 'https://linkedin.com/in/ry-nl',
    },
    {
        label: 'GitHub',
        value: 'github.com/ry-nl',
        href: 'https://github.com/ry-nl',
    },
]

export default function Contact() {
    const [navModalOpen, setNavModalOpen] = useState(false)
    const { setCursorVariant } = useCursor()

    const heroRef = useRef(null)

    const linksRef = useRef(null)
    const linksInView = useInView(linksRef, {
        margin: '0px 0px -100px 0px',
        once: true,
    })

    return (
        <main className="relative min-h-screen font-sans cursor-none">
            <NavSidebar
                navModalOpen={navModalOpen}
                setNavModalOpen={setNavModalOpen}
                links={[
                    { label: 'HOME', href: '/' },
                    { label: 'WORK', href: '/work' },
                    { label: 'ABOUT', href: '/about' },
                ]}
            />

            {/* ═══ HERO ═══ */}
            <section
                ref={heroRef}
                className="relative flex flex-col justify-center min-h-screen bg-dark text-white px-6 sm:px-12 lg:px-24"
                onClick={() => setNavModalOpen(false)}
            >
                {/* Top nav */}
                <nav className="absolute top-0 left-0 right-0 flex items-center px-6 sm:px-12 lg:px-24 py-6 text-lg font-thin tracking-widest text-white/60">
                    <TransitionLink
                        href="/"
                        className="cursor-none hover:text-white transition-colors duration-200"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        ← BACK
                    </TransitionLink>
                    <span className="absolute left-1/2 -translate-x-1/2 text-sm tracking-[0.2em] text-white/35 uppercase">
                        Contact
                    </span>
                </nav>

                <div className="max-w-[1000px]">
                    <motion.p
                        className="text-sm tracking-[0.25em] uppercase text-white/45 mb-8"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                    >
                        Get in Touch
                    </motion.p>
                    <motion.h1
                        className="text-3xl sm:text-4xl lg:text-[4.5rem] font-light leading-[1.1] tracking-tight mb-8"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.4}
                    >
                        Let&apos;s build something great together.
                    </motion.h1>
                    <motion.p
                        className="text-base sm:text-lg lg:text-xl font-light leading-relaxed text-white/60 max-w-[600px]"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.6}
                    >
                        I&apos;m always open to discussing new opportunities,
                        collaborations, or just connecting over shared interests
                        in technology and design.
                    </motion.p>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    >
                        <KeyboardArrowDown sx={{ fontSize: '2rem', color: 'rgba(255,255,255,0.45)' }} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══ CONTACT LINKS ═══ */}
            <section
                className="bg-light"
                onClick={() => setNavModalOpen(false)}
            >
                <motion.div
                    ref={linksRef}
                    className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-36"
                    style={{
                        translateY: linksInView ? '0px' : '40px',
                        opacity: linksInView ? '1' : '0',
                        transition: '0.8s',
                    }}
                >
                    <p className="text-sm tracking-[0.25em] uppercase text-black/50 mb-20">
                        Contact Information
                    </p>
                    <div className="space-y-0">
                        {contactLinks.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target={item.href.startsWith('tel:') ? undefined : '_blank'}
                                className={`group flex items-center justify-between py-6 sm:py-8 lg:py-10 border-black/15 cursor-none transition-all duration-300 ${
                                    index === 0 ? 'border-y' : 'border-b'
                                }`}
                                onMouseEnter={() => setCursorVariant('link')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <span className="text-sm tracking-[0.2em] uppercase text-black/40 w-20 sm:w-24 lg:w-32 shrink-0 group-hover:text-black/60 transition-colors duration-300">
                                    {item.label}
                                </span>
                                <span className="text-xl sm:text-2xl lg:text-4xl font-light tracking-tight text-black/80 group-hover:translate-x-3 transition-transform duration-400 ease-out">
                                    {item.value}
                                </span>
                                <span className="text-2xl text-black/25 group-hover:text-black/60 group-hover:translate-x-2 transition-all duration-300">
                                    ↗
                                </span>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ═══ LOCATION + FOOTER ═══ */}
            <section className="bg-dark text-white">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-12 sm:py-16 lg:py-24">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-0 border-t border-white/10 pt-12">
                        <div>
                            <p className="text-sm tracking-[0.2em] uppercase text-white/40 mb-3">
                                Location
                            </p>
                            <p className="text-2xl font-light text-white/80">
                                Los Angeles, CA
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 sm:gap-6">
                            <MagneticButton
                                onMouseEnter={() => setCursorVariant('link')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <TransitionLink
                                    href="/work"
                                    className="group inline-flex items-center gap-3 px-8 py-3 border border-white/30 rounded-full text-sm tracking-widest uppercase font-light text-white/70 hover:text-white hover:border-white/60 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/30 transition-all duration-300 cursor-none"
                                >
                                    View Experience <span className="inline-block transition-transform duration-300 ease-out group-hover:-rotate-45">→</span>
                                </TransitionLink>
                            </MagneticButton>
                            <MagneticButton
                                onMouseEnter={() => setCursorVariant('link')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <TransitionLink
                                    href="/about"
                                    className="group inline-flex items-center gap-3 px-8 py-3 border border-white/30 rounded-full text-sm tracking-widest uppercase font-light text-white/70 hover:text-white hover:border-white/60 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/30 transition-all duration-300 cursor-none"
                                >
                                    About Me <span className="inline-block transition-transform duration-300 ease-out group-hover:-rotate-45">→</span>
                                </TransitionLink>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between px-6 py-6 text-white/40 tracking-wide font-thin text-sm">
                    <span className="text-xs sm:text-sm">Based in Los Angeles, CA</span>
                    <span className="hidden lg:block text-xs sm:text-sm">
                        Built with Next.js, Tailwind CSS, and Framer Motion
                    </span>
                    <span className="text-xs sm:text-sm">© 2026 Ryan Lee - All Rights Reserved</span>
                </div>
            </section>
        </main>
    )
}
