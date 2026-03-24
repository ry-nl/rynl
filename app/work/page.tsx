'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

import { Menu, Circle } from '@mui/icons-material'

import Cursor from '../components/Cursor'
import { SlideButtonDarkUp } from '../components/Buttons'

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
    })

    const [navModalOpen, setNavModalOpen] = useState(false)
    const [cursorVariant, setCursorVariant] = useState('defaultLight')
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    const heroRef = useRef(null)
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })
    const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0])
    const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%'])

    return (
        <main className="relative min-h-screen text-dark font-sans">
            <Cursor cursorVariant={cursorVariant} />

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

            {/* Nav button */}
            <motion.div
                className="fixed flex justify-center items-center top-12 right-12 w-20 h-20 bg-white rounded-full shadow-xl z-50 cursor-none"
                whileHover={{ scale: 1.1 }}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={() => setCursorVariant('defaultLight')}
                onClick={() => setNavModalOpen(true)}
            >
                <Menu className="text-black" />
            </motion.div>

            {/* Nav modal */}
            <motion.div
                className="fixed top-0 right-0 w-1/3 h-screen bg-dark text-white font-light shadow-2xl z-50"
                initial={{ x: '100%' }}
                animate={{ x: navModalOpen ? '0%' : '100%' }}
                transition={{ ease: 'circOut' }}
                onMouseEnter={() => setCursorVariant('defaultLight')}
                onMouseLeave={() => setCursorVariant('defaultDark')}
            >
                <nav className="flex flex-col justify-center gap-24 w-full h-full p-24 text-4xl font-thin">
                    {[
                        { label: 'HOME', href: '/' },
                        { label: 'ABOUT', href: '/about' },
                        { label: 'CONTACT', href: '/contact' },
                    ].map((item) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            className="flex gap-4 items-center w-fit cursor-none"
                            onMouseEnter={() => setCursorVariant('link')}
                            onMouseLeave={() => setCursorVariant('defaultLight')}
                            whileHover={{
                                translateX: 10,
                                transition: { duration: 0.2 },
                            }}
                        >
                            <Circle className="w-[8px] h-[8px]" /> {item.label}
                        </motion.a>
                    ))}
                </nav>
            </motion.div>
            {navModalOpen && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-screen bg-black/30 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setNavModalOpen(false)}
                />
            )}

            {/* ═══ HERO ═══ */}
            <motion.section
                ref={heroRef}
                className="relative flex flex-col justify-end h-screen px-24 pb-32 text-white"
                style={{ opacity: heroOpacity, y: heroY }}
                onClick={() => setNavModalOpen(false)}
            >
                <h1 className="text-[8rem] font-light leading-none tracking-tight">
                    EXPERIENCE
                </h1>
                <div className="flex items-center gap-8 mt-8">
                    <div className="h-[1px] w-24 bg-white/40" />
                    <p className="text-lg font-light tracking-widest text-white/60 uppercase">
                        {EducationData.school} &mdash; {EducationData.degree}
                    </p>
                </div>
            </motion.section>

            {/* ═══ EXPERIENCE TIMELINE ═══ */}
            <section
                className="relative bg-light z-10"
                onClick={() => setNavModalOpen(false)}
                onMouseEnter={() => setCursorVariant('defaultDark')}
            >
                <div className="max-w-[1400px] mx-auto px-24 py-36">
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
                            setCursorVariant={setCursorVariant}
                        />
                    ))}
                </div>
            </section>

            {/* ═══ SKILLS ═══ */}
            <section
                className="relative bg-dark text-white z-10"
                onClick={() => setNavModalOpen(false)}
                onMouseEnter={() => setCursorVariant('defaultLight')}
            >
                <div className="max-w-[1400px] mx-auto px-24 py-36">
                    <h2 className="text-lg tracking-widest text-white/40 uppercase mb-20">
                        Skills &amp; Technologies
                    </h2>

                    <div className="grid grid-cols-2 gap-y-16 gap-x-24">
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
                onMouseEnter={() => setCursorVariant('defaultDark')}
            >
                <div className="max-w-[1400px] mx-auto px-24 py-36">
                    <h2 className="text-lg tracking-widest text-black/40 uppercase mb-20">
                        Education
                    </h2>
                    <div className="flex justify-between items-end border-t border-black/15 pt-12">
                        <div>
                            <h3 className="text-5xl font-light tracking-tight">
                                {EducationData.school}
                            </h3>
                            <p className="text-2xl font-light text-black/50 mt-4">
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
            <section
                className="relative bg-dark text-white z-10"
                onMouseEnter={() => setCursorVariant('defaultLight')}
            >
                <div className="max-w-[1400px] mx-auto px-24 py-24 flex items-center justify-between">
                    <div
                        className="flex shrink-0 font-thin tracking-wide text-xl"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('defaultLight')}
                    >
                        <SlideButtonDarkUp
                            buttonText="Download CV"
                            link="https://drive.google.com/file/d/1bL7hY_9-d8hVv4b2j8vsFqLUBJP8bH8K/view?usp=sharing"
                            popupText="↓"
                        />
                    </div>
                    <div
                        className="flex shrink-0 font-thin tracking-wide text-xl"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('defaultLight')}
                    >
                        <SlideButtonDarkUp
                            buttonText="View Projects"
                            link="https://github.com/ry-nl"
                            popupText="→"
                        />
                    </div>
                </div>
            </section>
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
    setCursorVariant,
}: {
    entry: (typeof ExperienceData)[number]
    index: number
    isExpanded: boolean
    isAnyExpanded: boolean
    onToggle: () => void
    setCursorVariant: (v: string) => void
}) {
    const [isHovered, setIsHovered] = useState(false)

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
                setCursorVariant('defaultDark')
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
                        className="text-6xl font-light tracking-tight"
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
                            <p className="text-2xl font-light text-black/60 mb-2">
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
                        className="px-4 py-1.5 text-sm tracking-wider border border-white/15 rounded-full text-white/70"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    )
}
