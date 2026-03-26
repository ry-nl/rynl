'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

import { KeyboardArrowDown } from '@mui/icons-material'
import { useCursor } from '../components/Cursor'
import { MagneticButton } from '../components/MagneticButton'
import { TransitionLink, usePageTransition } from '../components/PageTransition'

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

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function ContactForm({ setCursorVariant }: { setCursorVariant: (v: 'default' | 'link') => void }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<FormStatus>('idle')
    const [errorMsg, setErrorMsg] = useState('')
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const NAME_RE = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,}$/

    const errors = {
        name: touched.name && !NAME_RE.test(name.trim())
            ? name.trim().length === 0 ? 'Name is required.' : 'Enter a valid name.'
            : null,
        email: touched.email && !EMAIL_RE.test(email.trim())
            ? email.trim().length === 0 ? 'Email is required.' : 'Enter a valid email address.'
            : null,
        message: touched.message && message.trim().length < 30
            ? message.trim().length === 0 ? 'Message is required.' : `At least 30 characters (${message.trim().length}/30).`
            : null,
    }

    const isValid =
        NAME_RE.test(name.trim()) &&
        EMAIL_RE.test(email.trim()) &&
        message.trim().length >= 30

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setTouched({ name: true, email: true, message: true })
        if (!isValid) return

        setStatus('submitting')
        setErrorMsg('')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
            })
            const data = await res.json()

            if (res.ok) {
                setStatus('success')
                setName('')
                setEmail('')
                setMessage('')
                setTimeout(() => setStatus('idle'), 5000)
            } else {
                setStatus('error')
                setErrorMsg(data.error || 'Something went wrong.')
                setTimeout(() => setStatus('idle'), 4000)
            }
        } catch {
            setStatus('error')
            setErrorMsg('Network error. Please try again.')
            setTimeout(() => setStatus('idle'), 4000)
        }
    }

    const inputClasses = (field: 'name' | 'email' | 'message') =>
        `w-full bg-transparent border-b ${
            errors[field] ? 'border-red-400/60' :
            focusedField === field ? 'border-white/60' : 'border-white/15'
        } py-3 text-white font-light text-base sm:text-lg outline-none transition-all duration-500 placeholder:text-white/25 focus:placeholder:text-white/40 cursor-none`

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="relative">
                <motion.label
                    className="absolute left-0 text-xs tracking-[0.2em] uppercase pointer-events-none"
                    animate={{
                        y: focusedField === 'name' || name ? -22 : 0,
                        opacity: focusedField === 'name' || name ? 0.6 : 0,
                        scale: focusedField === 'name' || name ? 0.9 : 1,
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    Name
                </motion.label>
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    maxLength={50}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => { setFocusedField(null); setTouched(t => ({ ...t, name: true })) }}
                    className={inputClasses('name')}
                    disabled={status === 'submitting'}
                />
                <AnimatePresence>
                    {errors.name && (
                        <motion.p
                            className="text-xs text-red-400/70 font-light mt-1.5"
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                        >
                            {errors.name}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative">
                <motion.label
                    className="absolute left-0 text-xs tracking-[0.2em] uppercase pointer-events-none"
                    animate={{
                        y: focusedField === 'email' || email ? -22 : 0,
                        opacity: focusedField === 'email' || email ? 0.6 : 0,
                        scale: focusedField === 'email' || email ? 0.9 : 1,
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    Email
                </motion.label>
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    maxLength={50}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => { setFocusedField(null); setTouched(t => ({ ...t, email: true })) }}
                    className={inputClasses('email')}
                    disabled={status === 'submitting'}
                />
                <AnimatePresence>
                    {errors.email && (
                        <motion.p
                            className="text-xs text-red-400/70 font-light mt-1.5"
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                        >
                            {errors.email}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative">
                <motion.label
                    className="absolute left-0 text-xs tracking-[0.2em] uppercase pointer-events-none"
                    animate={{
                        y: focusedField === 'message' || message ? -22 : 0,
                        opacity: focusedField === 'message' || message ? 0.6 : 0,
                        scale: focusedField === 'message' || message ? 0.9 : 1,
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    Message
                </motion.label>
                <textarea
                    placeholder="Your message"
                    value={message}
                    maxLength={400}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => { setFocusedField(null); setTouched(t => ({ ...t, message: true })) }}
                    className={`${inputClasses('message')} resize-none h-32 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-white/40`}
                    disabled={status === 'submitting'}
                />
                <div className="flex justify-between items-center mt-1.5">
                    <AnimatePresence>
                        {errors.message && (
                            <motion.p
                                className="text-xs text-red-400/70 font-light"
                                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                {errors.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                    <motion.span
                        className="text-xs font-light tabular-nums ml-auto"
                        animate={{
                            opacity: focusedField === 'message' || message.length > 0 ? 1 : 0,
                            color: message.length > 360 ? 'rgba(248,113,113,0.8)' : 'rgba(255,255,255,0.25)',
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {message.length}/400
                    </motion.span>
                </div>
            </div>

            {/* Submit + status */}
            <div className="flex items-center gap-6 pt-2">
                <MagneticButton
                    disabled={status === 'submitting' || !isValid}
                    onMouseEnter={() => setCursorVariant('link')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    <button
                        type="submit"
                        disabled={status === 'submitting' || !isValid}
                        className="group inline-flex items-center gap-3 px-8 py-3 border border-white/30 rounded-full text-sm tracking-widest uppercase font-light text-white/70 hover:text-white hover:border-white/60 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/30 transition-all duration-300 cursor-none disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:border-white/30 disabled:hover:text-white/70"
                    >
                        {status === 'submitting' ? (
                            <>
                                Sending
                                <motion.span
                                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                />
                            </>
                        ) : (
                            <>
                                Send Message
                                <span className="inline-block transition-transform duration-300 ease-out group-hover:-rotate-45">→</span>
                            </>
                        )}
                    </button>
                </MagneticButton>

                <AnimatePresence mode="wait">
                    {status === 'success' && (
                        <motion.span
                            key="success"
                            className="text-sm tracking-wide text-green-400/80 font-light"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            Message sent successfully.
                        </motion.span>
                    )}
                    {status === 'error' && (
                        <motion.span
                            key="error"
                            className="text-sm tracking-wide text-red-400/80 font-light"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {errorMsg}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </form>
    )
}

export default function Contact() {
    const { setNavModalOpen } = usePageTransition()
    const { setCursorVariant } = useCursor()

    const heroRef = useRef(null)

    const linksRef = useRef(null)
    const linksInView = useInView(linksRef, {
        margin: '0px 0px -100px 0px',
        once: true,
    })

    return (
        <main className="relative min-h-screen font-sans cursor-none">
            {/* ═══ HERO ═══ */}
            <section
                ref={heroRef}
                className="relative flex flex-col justify-center min-h-screen bg-dark text-white px-6 sm:px-12 lg:px-24"
                onClick={() => setNavModalOpen(false)}
            >
                {/* Top nav */}
                <nav className="absolute top-0 left-0 right-0 flex items-center justify-center px-6 sm:px-12 lg:px-24 py-6 text-lg font-thin tracking-widest text-white/60">
                    <span className="text-sm tracking-[0.2em] text-white/35 uppercase">
                        Contact
                    </span>
                </nav>

                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-16 lg:gap-24 max-w-[1400px] w-full mx-auto py-32 sm:py-0">
                    {/* Left: headline */}
                    <div className="lg:flex-1 max-w-[600px]">
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
                            className="text-base sm:text-lg lg:text-xl font-light leading-relaxed text-white/60"
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

                    {/* Right: contact form */}
                    <motion.div
                        className="w-full lg:flex-1 max-w-[520px]"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.7}
                    >
                        <div className="border border-white/10 rounded-2xl p-8 sm:p-10 backdrop-blur-sm bg-white/[0.02]">
                            <p className="text-sm tracking-[0.2em] uppercase text-white/40 mb-10">
                                Send an inquiry
                            </p>
                            <ContactForm setCursorVariant={setCursorVariant} />
                        </div>
                    </motion.div>
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
