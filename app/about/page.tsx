'use client'
import { useRef, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'

import { KeyboardArrowDown } from '@mui/icons-material'
import { useCursor } from '../components/Cursor'
import { TransitionLink, usePageTransition } from '../components/PageTransition'
import { MagneticButton } from '../components/MagneticButton'


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

const values = [
    {
        title: 'User-Centered',
        description:
            'Every technical decision should serve the people who use the product. I build with empathy, ensuring that complexity is absorbed by the system — not passed to the user.',
    },
    {
        title: 'Impact-Driven',
        description:
            'I gravitate toward problems with measurable outcomes. Whether it\'s scaling a platform to process 300 million messages or reducing end-user fees by upwards of 65%, I am invested in results that matter.',
    },
    {
        title: 'Thoughtful Craft',
        description:
            'Good software is invisible. I sweat the details — from API response times to pixel-level polish — because quality compounds over time.',
    },
    {
        title: 'Continuous Growth',
        description:
            'I actively seek out unfamiliar territory. Moving across languages, teams, and problem domains keeps me sharp and broadens how I think about solutions.',
    },
]

const timeline = [
    { year: '2025', label: 'Software Engineer II at Salesforce' },
    { year: '2023', label: 'Software Development Engineer at AWS' },
    { year: '2023', label: 'B.S. Computer Science, USC' },
    { year: '2022', label: 'Back-End Engineer at Polarity' },
    { year: '2020', label: 'Began studies at USC' },
]

export default function About() {
    const { setNavModalOpen } = usePageTransition()
    const { setCursorVariant } = useCursor()

    const heroRef = useRef(null)

    // 3D tilt effect for profile image
    const tiltX = useMotionValue(0)
    const tiltY = useMotionValue(0)
    const springConfig = { damping: 25, stiffness: 180, mass: 0.6 }
    const smoothTiltX = useSpring(tiltX, springConfig)
    const smoothTiltY = useSpring(tiltY, springConfig)

    const handleTiltMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const x = (e.clientX - centerX) / (rect.width / 2) // -1 to 1
            const y = (e.clientY - centerY) / (rect.height / 2) // -1 to 1
            tiltX.set(y * -6) // rotateX: tilt away from mouse vertically
            tiltY.set(x * 6)  // rotateY: tilt toward mouse horizontally
        },
        [tiltX, tiltY]
    )

    const handleTiltLeave = useCallback(() => {
        tiltX.set(0)
        tiltY.set(0)
    }, [tiltX, tiltY])

    const statementRef = useRef(null)
    const statementInView = useInView(statementRef, {
        margin: '0px 0px -150px 0px',
        once: true,
    })

    const valuesRef = useRef(null)
    const valuesInView = useInView(valuesRef, {
        margin: '0px 0px -100px 0px',
        once: true,
    })

    const timelineRef = useRef(null)
    const timelineInView = useInView(timelineRef, {
        margin: '0px 0px -100px 0px',
        once: true,
    })

    return (
        <main className="relative min-h-screen font-sans cursor-none">
            {/* ═══ HERO ═══ */}
            <section
                ref={heroRef}
                className="relative min-h-screen bg-light flex flex-col"
                onClick={() => setNavModalOpen(false)}
            >
                {/* Top nav */}
                <nav className="relative flex items-center justify-center px-6 sm:px-12 lg:px-24 py-6 text-lg font-thin tracking-widest text-black/60">
                    <span className="text-sm tracking-[0.2em] text-black/45 uppercase">
                        About
                    </span>
                </nav>

                <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-24 py-6 sm:py-0">
                    <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-12 lg:gap-24 max-w-[1400px] w-full">
                        {/* Photo with 3D tilt */}
                        <motion.div
                            className="shrink-0 flex justify-center"
                            style={{ perspective: 800 }}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                        >
                            <motion.div
                                className="relative w-[220px] h-[275px] sm:w-[340px] sm:h-[420px] lg:w-[420px] lg:h-[520px] overflow-hidden rounded-2xl"
                                onMouseMove={handleTiltMove}
                                onMouseLeave={handleTiltLeave}
                                style={{
                                    rotateX: smoothTiltX,
                                    rotateY: smoothTiltY,
                                    transformStyle: 'preserve-3d',
                                    boxShadow: '0 30px 60px -10px rgba(0,0,0,0.3), 0 18px 36px -18px rgba(0,0,0,0.25)',
                                }}
                            >
                                <Image
                                    src="/profile.jpg"
                                    alt="Ryan Lee"
                                    width={420}
                                    height={520}
                                    className="object-cover object-top w-full h-full"
                                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 420px"
                                    priority
                                />
                                {/* Glossy reflection overlay that moves with tilt */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none rounded-2xl"
                                    style={{
                                        background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Intro text */}
                        <div className="flex flex-col justify-center w-full lg:flex-1">
                            <motion.p
                                className="text-sm tracking-[0.25em] uppercase text-black/55 mb-6"
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={0.3}
                            >
                                Software Engineer &mdash; Los Angeles, CA
                            </motion.p>
                            <motion.h1
                                className="text-4xl sm:text-5xl lg:text-[5.5rem] font-light leading-[1.05] tracking-tight mb-4 sm:mb-10"
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={0.4}
                            >
                                Ryan Lee
                            </motion.h1>
                            <motion.p
                                className="text-lg sm:text-xl lg:text-2xl font-light leading-relaxed text-black/70 max-w-[560px]"
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={0.6}
                            >
                                I&apos;m a software engineer who builds at the intersection of
                                scalable infrastructure and polished user experiences. Currently
                                at Salesforce, previously at AWS — I care deeply about
                                crafting systems that are as elegant under the hood as they are
                                on the surface.
                            </motion.p>
                            <motion.div
                                className="hidden lg:flex gap-6 mt-6 sm:mt-12"
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={0.8}
                            >
                                {[
                                    { label: 'Resume', href: 'https://drive.google.com/file/d/1bL7hY_9-d8hVv4b2j8vsFqLUBJP8bH8K/view?usp=sharing' },
                                    { label: 'LinkedIn', href: 'https://linkedin.com/in/ry-nl' },
                                ].map(({ label, href }) => (
                                    <MagneticButton
                                        key={label}
                                        onMouseEnter={() => setCursorVariant('link')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                    >
                                        <a
                                            href={href}
                                            target="_blank"
                                            className="group inline-flex items-center gap-3 px-8 py-3 border border-black/30 rounded-full text-sm tracking-widest uppercase font-light text-black/70 hover:text-black hover:border-black/60 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-none"
                                        >
                                            {label} <span className="text-lg inline-block transition-transform duration-300 ease-out group-hover:-rotate-45">→</span>
                                        </a>
                                    </MagneticButton>
                                ))}
                            </motion.div>
                        </div>
                    </div>
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
                        <KeyboardArrowDown sx={{ fontSize: '2rem', color: 'rgba(0,0,0,0.25)' }} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══ PERSONAL STATEMENT ═══ */}
            <section
                className="bg-dark text-white"
                onClick={() => setNavModalOpen(false)}
            >
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-36">
                    <motion.div
                        ref={statementRef}
                        style={{
                            translateY: statementInView ? '0px' : '40px',
                            opacity: statementInView ? '1' : '0',
                            transition: '0.8s',
                        }}
                    >
                        <p className="text-sm tracking-[0.25em] uppercase text-white/45 mb-12">
                            Personal Statement
                        </p>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed text-white max-w-[1000px]">
                            I believe the best software comes from engineers who understand
                            both the technical depth and the human context of what they build.
                            My career has been shaped by working across the full stack — from
                            designing autoscaling systems that handle hundreds of millions of
                            messages, to crafting front-end experiences that feel effortless.
                        </h2>
                        <p className="text-xl font-light leading-relaxed text-white/70 mt-12 max-w-[800px]">
                            At AWS, I learned to think in systems — building monitoring
                            infrastructure consumed by over 100 teams and processing 200TB
                            of hourly telemetry. At Salesforce, I&apos;ve applied that
                            systems thinking to product-facing challenges, scaling
                            communication channels and launching features that directly
                            improve user retention. What connects these experiences is a
                            commitment to building things that are reliable, performant,
                            and genuinely useful.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ═══ VALUES ═══ */}
            <section
                className="bg-light"
                onClick={() => setNavModalOpen(false)}
            >
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-36">
                    <motion.div
                        ref={valuesRef}
                        style={{
                            translateY: valuesInView ? '0px' : '40px',
                            opacity: valuesInView ? '1' : '0',
                            transition: '0.8s',
                        }}
                    >
                        <p className="text-sm tracking-[0.25em] uppercase text-black/50 mb-20">
                            What Drives Me
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12 sm:gap-y-16 lg:gap-y-20">
                            {values.map((item, index) => (
                                <div
                                    key={item.title}
                                    className="border-t border-black/15 pt-8"
                                >
                                    <div className="flex items-baseline gap-4 mb-4">
                                        <span className="text-sm text-black/40 font-light">
                                            0{index + 1}
                                        </span>
                                        <h3 className="text-2xl font-normal tracking-tight text-black/90">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-lg leading-relaxed text-black/60 pl-10">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ TIMELINE ═══ */}
            <section
                className="bg-dark text-white"
                onClick={() => setNavModalOpen(false)}
            >
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-36">
                    <motion.div
                        ref={timelineRef}
                        style={{
                            translateY: timelineInView ? '0px' : '40px',
                            opacity: timelineInView ? '1' : '0',
                            transition: '0.8s',
                        }}
                    >
                        <p className="text-sm tracking-[0.25em] uppercase text-white/45 mb-20">
                            Journey
                        </p>
                        <div className="space-y-0">
                            {timeline.map((item, index) => (
                                <div
                                    key={`${item.year}-${index}`}
                                    className={`group flex items-center gap-6 sm:gap-10 lg:gap-16 py-5 sm:py-6 lg:py-8 border-white/15 px-4 -mx-4 rounded-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.04] hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.08)] ${
                                        index === 0 ? 'border-y' : 'border-b'
                                    }`}
                                >
                                    <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-white/35 w-20 sm:w-28 lg:w-32 shrink-0 transition-colors duration-300 group-hover:text-white/50">
                                        {item.year}
                                    </span>
                                    <span className="text-base sm:text-lg lg:text-2xl font-light text-white/85 transition-colors duration-300 group-hover:text-white">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ FOOTER CTA ═══ */}
            <section className="bg-light">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-12 sm:py-16 lg:py-24 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
                    {/* Resume + LinkedIn — mobile only */}
                    {[
                        { label: 'Resume', href: 'https://drive.google.com/file/d/1bL7hY_9-d8hVv4b2j8vsFqLUBJP8bH8K/view?usp=sharing' },
                        { label: 'LinkedIn', href: 'https://linkedin.com/in/ry-nl' },
                    ].map(({ label, href }) => (
                        <MagneticButton
                            key={label}
                            className="lg:hidden"
                            onMouseEnter={() => setCursorVariant('link')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <a
                                href={href}
                                target="_blank"
                                className="group inline-flex items-center gap-3 px-8 py-3 border border-black/30 rounded-full text-sm tracking-widest uppercase font-light text-black/70 hover:text-black hover:border-black/60 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-none"
                            >
                                {label} <span className="text-lg inline-block transition-transform duration-300 ease-out group-hover:-rotate-45">→</span>
                            </a>
                        </MagneticButton>
                    ))}
                    <MagneticButton
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <TransitionLink
                            href="/work"
                            className="group inline-flex items-center gap-3 px-8 py-3 border border-black/30 rounded-full text-sm tracking-widest uppercase font-light text-black/70 hover:text-black hover:border-black/60 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-none"
                        >
                            View Experience <span className="text-lg inline-block transition-transform duration-300 ease-out group-hover:-rotate-45">→</span>
                        </TransitionLink>
                    </MagneticButton>
                    <MagneticButton
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <TransitionLink
                            href="/contact"
                            className="group inline-flex items-center gap-3 px-8 py-3 border border-black/30 rounded-full text-sm tracking-widest uppercase font-light text-black/70 hover:text-black hover:border-black/60 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-none"
                        >
                            Get in Touch <span className="text-lg inline-block transition-transform duration-300 ease-out group-hover:-rotate-45">→</span>
                        </TransitionLink>
                    </MagneticButton>
                </div>
            </section>
        </main>
    )
}
