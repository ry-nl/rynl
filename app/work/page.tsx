'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

import { KeyboardArrowDown } from '@mui/icons-material'
import { useCursor } from '../components/Cursor'
import { MagneticButton } from '../components/MagneticButton'
import NavSidebar from '../components/NavSidebar'
import { TransitionLink } from '../components/PageTransition'

import {
    ExperienceData,
    EducationData,
    SkillsData,
} from '../data/work/ProjectData'

export default function Work() {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.4
        }
    }, [])

    const [navModalOpen, setNavModalOpen] = useState(false)
    const { setCursorVariant } = useCursor()
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    const heroRef = useRef(null)
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })
    const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0])
    const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%'])

    return (
        <main className="relative min-h-screen text-dark font-sans cursor-none">
            {/* Background video — fixed, dark, behind everything */}
            <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                loop
                className="fixed top-0 left-0 w-full h-screen object-cover brightness-[30%] grayscale-[30%] blur-sm scale-110 -z-10"
            >
                <source
                    src="/workSectionBackgroundVideo720.mp4"
                    type="video/mp4"
                />
            </video>

            <NavSidebar
                navModalOpen={navModalOpen}
                setNavModalOpen={setNavModalOpen}
                links={[
                    { label: 'HOME', href: '/' },
                    { label: 'ABOUT', href: '/about' },
                    { label: 'CONTACT', href: '/contact' },
                ]}
            />

            {/* ═══ HERO ═══ */}
            <motion.section
                ref={heroRef}
                className="relative flex flex-col h-screen px-6 sm:px-12 lg:px-24 pb-16 sm:pb-24 lg:pb-32 text-white"
                style={{ opacity: heroOpacity, y: heroY }}
                onClick={() => setNavModalOpen(false)}
            >
                <nav className="relative flex items-center py-6 text-lg font-thin tracking-widest text-white/70">
                    <TransitionLink
                        href="/"
                        className="cursor-none hover:text-white transition-colors duration-200"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        ← BACK
                    </TransitionLink>
                    <span className="absolute left-1/2 -translate-x-1/2 text-sm tracking-[0.2em] text-white/40 uppercase">
                        Work
                    </span>
                </nav>
                <div className="flex-1 flex flex-col justify-end">
                <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-light leading-none tracking-tight">
                    EXPERIENCE
                </h1>
                <div className="flex items-center gap-8 mt-8">
                    <div className="h-[1px] w-24 bg-white/40" />
                    <p className="text-lg font-light tracking-widest text-white/60 uppercase">
                        {EducationData.school} &mdash; {EducationData.degree}
                    </p>
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
                        <KeyboardArrowDown sx={{ fontSize: '2rem', color: 'rgba(255,255,255,0.45)' }} />
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* ═══ EXPERIENCE TIMELINE ═══ */}
            <section
                className="relative bg-light z-10"
                onClick={() => setNavModalOpen(false)}
            >
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-36">
                    {ExperienceData.map((entry, index) => (
                        <ExperienceRow
                            key={`${entry.company}-${entry.role}`}
                            entry={entry}
                            index={index}
                            isExpanded={expandedIndex === index}
                            isAnyExpanded={expandedIndex !== null}
                            onToggle={() =>
                                setExpandedIndex(
                                    expandedIndex === index ? null : index
                                )
                            }
                        />
                    ))}
                </div>
            </section>

            {/* ═══ SKILLS ═══ */}
            <section
                className="relative bg-dark text-white z-10"
                onClick={() => setNavModalOpen(false)}
            >
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-36">
                    <h2 className="text-lg tracking-widest text-white/40 uppercase mb-20">
                        Skills &amp; Technologies
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 sm:gap-y-16 gap-x-12 lg:gap-x-24">
                        <SkillGroup
                            label="Languages"
                            items={SkillsData.languages}
                        />
                        <SkillGroup
                            label="Core Skills"
                            items={SkillsData.skills}
                        />
                        <SkillGroup
                            label="Back-End"
                            items={SkillsData.backEnd}
                        />
                        <SkillGroup
                            label="Front-End"
                            items={SkillsData.frontEnd}
                        />
                        <SkillGroup
                            label="Tools & Other"
                            items={SkillsData.other}
                        />
                    </div>
                </div>
            </section>

            {/* ═══ EDUCATION ═══ */}
            <section
                className="relative bg-light z-10"
                onClick={() => setNavModalOpen(false)}
            >
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-36">
                    <h2 className="text-lg tracking-widest text-black/40 uppercase mb-20">
                        Education
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-t border-black/15 pt-12">
                        <div>
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                                {EducationData.school}
                            </h3>
                            <p className="text-xl sm:text-2xl font-light text-black/50 mt-4">
                                {EducationData.degree}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-light text-black/40">
                                {EducationData.dates}
                            </p>
                            <p className="text-lg font-light text-black/50 mt-2 italic">
                                {EducationData.honors}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ FOOTER CTA ═══ */}
            <section className="relative bg-dark text-white z-10">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-12 sm:py-16 lg:py-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <MagneticButton
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <a
                            href="https://drive.google.com/file/d/1bL7hY_9-d8hVv4b2j8vsFqLUBJP8bH8K/view?usp=sharing"
                            target="_blank"
                            className="group inline-flex items-center gap-3 px-8 py-3 border border-white/30 rounded-full text-sm tracking-widest uppercase font-light text-white/70 whitespace-nowrap hover:text-white hover:border-white/60 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/30 transition-all duration-300 cursor-none"
                        >
                            Download CV <span className="inline-block transition-transform duration-300 ease-out group-hover:-rotate-45">→</span>
                        </a>
                    </MagneticButton>
                    <MagneticButton
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <a
                            href="https://github.com/ry-nl"
                            target="_blank"
                            className="group inline-flex items-center gap-3 px-8 py-3 border border-white/30 rounded-full text-sm tracking-widest uppercase font-light text-white/70 whitespace-nowrap hover:text-white hover:border-white/60 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/30 transition-all duration-300 cursor-none"
                        >
                            View Projects <span className="inline-block transition-transform duration-300 ease-out group-hover:-rotate-45">→</span>
                        </a>
                    </MagneticButton>
                </div>
            </section>
            <div className="flex justify-between px-6 py-6 bg-dark text-white/40 tracking-wide font-thin text-sm">
                <span className="text-xs sm:text-sm">Based in Los Angeles, CA</span>
                <span className="hidden lg:block text-xs sm:text-sm">
                    Built with Next.js, Tailwind CSS, and Framer Motion
                </span>
                <span className="text-xs sm:text-sm">© 2026 Ryan Lee - All Rights Reserved</span>
            </div>
        </main>
    )
}

/* ────────────────────────────────────────
   Experience Row
   ──────────────────────────────────────── */

function ExperienceRow({
    entry,
    index,
    isExpanded,
    isAnyExpanded,
    onToggle,
}: {
    entry: (typeof ExperienceData)[number]
    index: number
    isExpanded: boolean
    isAnyExpanded: boolean
    onToggle: () => void
}) {
    const [isHovered, setIsHovered] = useState(false)
    const { setCursorVariant } = useCursor()

    return (
        <motion.div
            className={`border-black/15 cursor-none ${index === 0 ? 'border-y' : 'border-b'}`}
            onClick={onToggle}
            onMouseEnter={() => {
                setIsHovered(true)
                setCursorVariant('link')
            }}
            onMouseLeave={() => {
                setIsHovered(false)
                setCursorVariant('default')
            }}
        >
            {/* Header row */}
            <motion.div
                className="flex items-center justify-between"
                animate={{
                    paddingTop: isExpanded ? '2.5rem' : '1.5rem',
                    paddingBottom: isExpanded ? '1.5rem' : '1.5rem',
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className="flex items-baseline gap-6">
                    <motion.h2
                        className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight"
                        animate={{
                            x: isHovered || isExpanded ? '1.5rem' : '0rem',
                            opacity:
                                !isAnyExpanded || isExpanded
                                    ? 1
                                    : isHovered
                                      ? 0.7
                                      : 0.25,
                        }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                    >
                        {entry.company}
                    </motion.h2>
                </div>
                <motion.div
                    className="flex items-center gap-8"
                    animate={{
                        opacity:
                            !isAnyExpanded || isExpanded
                                ? 1
                                : isHovered
                                  ? 0.7
                                  : 0.25,
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                >
                    <span className="text-lg font-light text-black/40 tracking-wide">
                        {entry.dates}
                    </span>
                    <motion.span
                        className="text-2xl font-light text-black/30"
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                    >
                        +
                    </motion.span>
                </motion.div>
            </motion.div>

            {/* Expandable detail */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="overflow-hidden"
                    >
                        <div className="pb-10 pl-6">
                            <p className="text-xl sm:text-2xl font-light text-black/60 mb-2">
                                {entry.role}
                            </p>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {entry.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-1 text-sm tracking-wider uppercase border border-black/15 rounded-full text-black/50"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <ul className="space-y-4">
                                {entry.accomplishments.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex gap-4 text-lg font-light text-black/70 leading-relaxed"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: i * 0.05,
                                        }}
                                    >
                                        <span className="text-black/25 mt-[2px] shrink-0">
                                            &mdash;
                                        </span>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

/* ────────────────────────────────────────
   Skill Group
   ──────────────────────────────────────── */

function SkillGroup({ label, items }: { label: string; items: string[] }) {
    return (
        <div>
            <h3 className="text-sm tracking-widest uppercase text-white/30 mb-4">
                {label}
            </h3>
            <div className="flex flex-wrap gap-3">
                {items.map((item) => (
                    <span
                        key={item}
                        className="px-4 py-1.5 text-sm tracking-wider border border-white/15 rounded-full text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/[0.06]"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    )
}
