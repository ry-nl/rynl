'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'

import ParallaxText from './components/ParallaxText'
import StickyComponent from './components/StickyComponent'
import { SlideButtonLightRight, SlideButtonDarkUp } from './components/Buttons'
import { useCursor } from './components/Cursor'
import NavSidebar from './components/NavSidebar'
import { TransitionLink } from './components/PageTransition'
import { MagneticButton } from './components/MagneticButton'

import PhotoWebsite from '@/public/photoWebsite.jpg'
import TeaWebsite from '@/public/teaWebsite.jpg'
import ArchWebsite from '@/public/archWebsite.jpg'
import CryptoWebsite from '@/public/cryptoWebsite.jpg'
import GalleryWebsite from '@/public/galleryWebsite.png'
import SaasWebsite from '@/public/saasWebsite.png'

import { KeyboardArrowDown } from '@mui/icons-material'
import { StaticImageData } from 'next/image'

const heroFadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    }),
}

interface GalleryImage {
    src: StaticImageData
    alt: string
    bgColor: string
}

const galleryRows: GalleryImage[][] = [
    [
        { src: TeaWebsite, alt: 'tea website', bgColor: '#a3afb5' },
        { src: ArchWebsite, alt: 'arch website', bgColor: '#d1cac5' },
        { src: PhotoWebsite, alt: 'photo website', bgColor: '#574c43' },
    ],
    [
        { src: CryptoWebsite, alt: 'crypto website', bgColor: '#7f997c' },
        { src: SaasWebsite, alt: 'saas website', bgColor: '#84868c' },
        { src: GalleryWebsite, alt: 'gallery website', bgColor: '#ab9a9a' },
    ],
]

function ParallaxGalleryRow({
    images,
    index,
}: {
    images: GalleryImage[]
    index: number
}) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['0 1', '1 0'],
    })
    const parallaxRange = index % 2 === 0 ? ['5vw', '-5vw'] : ['-5vw', '5vw']
    const x = useTransform(scrollYProgress, [0, 1], parallaxRange)
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4])
    const imageWidth = `${Math.ceil(115 / images.length)}vw`
    const rowHeight = index === 0 ? 'h-[45vh]' : 'h-[38vh]'

    return (
        <motion.div
            ref={ref}
            className="flex justify-center gap-4 sm:gap-5 lg:gap-6"
            style={{ x, opacity }}
        >
            {images.map((img) => (
                <div
                    key={img.alt}
                    className={`group shrink-0 overflow-hidden rounded-xl ${rowHeight}`}
                    style={{ width: imageWidth }}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        className="object-cover w-full h-full grayscale-[40%] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.06]"
                        sizes={imageWidth}
                    />
                </div>
            ))}
        </motion.div>
    )
}

const experienceEntries = [
    { name: 'SALESFORCE', link: 'https://www.salesforce.com/' },
    { name: 'AWS', link: 'https://aws.amazon.com/' },
    { name: 'POLARITY', link: 'https://www.flashnet.xyz/' },
]

export default function Landing() {
    // background video effect
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5
        }
    }, [])

    const { scrollYProgress: videoScrollYProgress } = useScroll({
        target: videoRef,
        offset: ['0 0', '1 0'],
    })

    const videoY = useTransform(videoScrollYProgress, [0, 1], ['0', '550px'])

    // cursor effect
    const { setCursorVariant } = useCursor()

    const ref = useRef(null)
    // nav button and nav menu effect
    const heroRef = useRef(null)
    const heroInView = useInView(heroRef)

    const [navModalOpen, setNavModalOpen] = useState(false)

    // recent work hover effect
    const [workLinkHovered, setWorkLinkHovered] = useState(-1)

    // flavor in view effect
    const flavorTextRef = useRef(null)
    const flavorTextInView = useInView(flavorTextRef, {
        margin: '0px 0px -200px 0px',
        once: true,
    })

    // experience section in view
    const experienceRef = useRef(null)
    const experienceInView = useInView(experienceRef, {
        margin: '0px 0px -100px 0px',
        once: true,
    })

    // footer CTA in view
    const footerCtaRef = useRef(null)
    const footerCtaInView = useInView(footerCtaRef, {
        margin: '0px 0px -150px 0px',
        once: true,
    })

    const navLinks = [
        { label: 'WORK', href: '/work' },
        { label: 'ABOUT', href: '/about' },
        { label: 'CONTACT', href: '/contact' },
    ]

    // RENDER
    return (
        <motion.div ref={ref} className="bg-light font-sans cursor-none">
            <NavSidebar
                navModalOpen={navModalOpen}
                setNavModalOpen={setNavModalOpen}
                links={navLinks}
            />
            <div className="z-10" onClick={() => setNavModalOpen(false)}>
                <section
                    ref={heroRef}
                    id="hero-section-container"
                    className="relative h-screen w-screen text-white bg-dark overflow-hidden"
                >
                    <motion.video
                        ref={videoRef}
                        playsInline
                        autoPlay
                        muted
                        loop
                        preload="auto"
                        className="absolute top-0 left-0 w-full h-[120vh] object-cover contrast-[105%] brightness-[65%] grayscale-[25%]"
                        style={{ y: videoY }}
                    >
                        <source src="/bg-video-720.mp4" type="video/mp4" />
                    </motion.video>
                    <nav className="absolute top-0 left-0 right-0 flex items-center px-6 sm:px-12 lg:px-24 py-6 font-thin z-20 pointer-events-none">
                        <span className="text-sm tracking-[0.2em] text-white/50 uppercase">
                            Ryan Lee
                        </span>
                        <span className="absolute left-1/2 -translate-x-1/2 text-sm tracking-[0.2em] text-white/35 uppercase">
                            Portfolio
                        </span>
                    </nav>
                    <div className="absolute bottom-16 left-0 right-0 overflow-hidden text-white/20 tracking-tight">
                        <ParallaxText baseVelocity={1}>
                            SOFTWARE DEVELOPER - UI/UX DESIGNER -
                        </ParallaxText>
                    </div>
                    <div className="absolute left-6 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 tracking-wide z-10">
                        <motion.div
                            className="flex gap-6 items-center font-normal text-5xl sm:text-7xl lg:text-8xl"
                            variants={heroFadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                        >
                            <h1>RYAN LEE</h1>
                        </motion.div>
                        <motion.div
                            className="font-thin text-xl sm:text-2xl lg:text-3xl pt-6 text-white/70"
                            variants={heroFadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.5}
                        >
                            SOFTWARE DEVELOPER & UI/UX DESIGNER
                        </motion.div>
                    </div>
                    <motion.div
                        className="absolute right-24 top-1/2 -translate-y-1/2 font-thin text-2xl text-white/70 z-10 hidden xl:block"
                        variants={heroFadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.8}
                    >
                        <div className="pb-12">Based in Los Angeles, CA</div>
                        <div>University of Southern California,</div>
                        <div>B.S. Computer Science</div>
                    </motion.div>
                    <motion.div
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
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
                <section
                    id="flavor-section-container"
                    className="relative h-fit px-6 sm:px-16 lg:px-36 bg-light z-10"
                >
                    <div id="section-content" className="w-full h-full py-32 sm:py-44 lg:py-56">
                        <motion.div
                            ref={flavorTextRef}
                            id="flavor-text"
                            className="flex flex-col items-center text-center gap-10 font-light"
                            style={{
                                translateY: flavorTextInView ? '0px' : '50px',
                                opacity: flavorTextInView ? '1' : '0',
                                transition: '0.8s',
                            }}
                        >
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl max-w-[860px] leading-relaxed">
                                User first, always. I am committed to creating
                                intuitive front-end experiences and effective
                                back-end systems — software solutions that are
                                as compelling as they are reliable.
                            </h1>
                        </motion.div>
                    </div>
                </section>
                <section
                    id="work-section-container"
                    className="relative h-fit bg-light z-10 hidden sm:block"
                >
                    <div
                        id="section-content"
                        className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-screen overflow-hidden py-12 sm:py-16 lg:py-24"
                    >
                        {galleryRows.map((images, index) => (
                            <ParallaxGalleryRow
                                key={index}
                                images={images}
                                index={index}
                            />
                        ))}
                    </div>
                </section>
                <section
                    id="recent-work-section-container"
                    className="w-full py-24 sm:py-32 lg:py-44 pb-24 sm:pb-36 lg:pb-60 bg-light z-10"
                >
                    <motion.div
                        ref={experienceRef}
                        className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24"
                        style={{
                            translateY: experienceInView ? '0px' : '40px',
                            opacity: experienceInView ? '1' : '0',
                            transition: '0.8s',
                        }}
                    >
                        <p className="text-sm tracking-[0.25em] uppercase text-black/50 mb-20">
                            Companies
                        </p>
                        <div>
                            {experienceEntries.map((entry, index) => (
                                <a
                                    key={entry.name}
                                    href={entry.link}
                                    target="_blank"
                                    className={`flex items-center justify-between py-8 border-black/15 cursor-none ${
                                        index === 0 ? 'border-y' : 'border-b'
                                    }`}
                                    onMouseEnter={() => {
                                        setWorkLinkHovered(index)
                                        setCursorVariant('link')
                                    }}
                                    onMouseLeave={() => {
                                        setWorkLinkHovered(-1)
                                        setCursorVariant('default')
                                    }}
                                >
                                    <motion.h2
                                        className="text-3xl sm:text-4xl lg:text-6xl font-light tracking-tight"
                                        animate={{
                                            x: workLinkHovered === index ? '1.5rem' : '0rem',
                                            opacity:
                                                workLinkHovered === -1
                                                    ? 1
                                                    : workLinkHovered === index
                                                      ? 1
                                                      : 0.25,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                        }}
                                    >
                                        {entry.name}
                                    </motion.h2>
                                    <motion.span
                                        className="text-2xl font-light text-black/30"
                                        animate={{
                                            opacity: workLinkHovered === index ? 1 : 0,
                                            x: workLinkHovered === index ? '0rem' : '-1rem',
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                        }}
                                    >
                                        ↗
                                    </motion.span>
                                </a>
                            ))}
                            <div className="flex justify-center w-full pt-16">
                                <MagneticButton
                                    onMouseEnter={() => setCursorVariant('link')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                >
                                    <a
                                        href="https://github.com/ry-nl"
                                        target="_blank"
                                        className="group inline-flex items-center gap-3 px-8 py-3 border border-black/30 rounded-full text-sm tracking-widest uppercase font-light text-black/70 hover:text-black hover:border-black/60 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-none"
                                    >
                                        More Work <span className="inline-block transition-transform duration-300 ease-out group-hover:-rotate-45">→</span>
                                    </a>
                                </MagneticButton>
                            </div>
                        </div>
                    </motion.div>
                </section>
                <section
                    id="info-section-container"
                    className="relative flex justify-between h-screen bg-dark"
                >
                    <motion.div
                        ref={footerCtaRef}
                        id="section-content"
                        className="flex flex-col justify-center w-full h-full text-white px-6 sm:px-16 lg:px-36"
                    >
                        <div className="text-white font-thin pb-12 sm:pb-16 lg:pb-24 border-b">
                            <motion.h1
                                className="pb-8 text-xl sm:text-2xl lg:text-3xl text-white/70"
                                style={{
                                    translateY: footerCtaInView ? '0px' : '30px',
                                    opacity: footerCtaInView ? '1' : '0',
                                    transition: '0.8s',
                                }}
                            >
                                Thanks for stopping by!
                            </motion.h1>
                            <motion.h1
                                className="text-4xl sm:text-5xl lg:text-7xl font-light"
                                style={{
                                    translateY: footerCtaInView ? '0px' : '30px',
                                    opacity: footerCtaInView ? '1' : '0',
                                    transition: '0.8s 0.2s',
                                }}
                            >
                                Let&apos;s Make Great Things.
                            </motion.h1>
                        </div>
                        <div className="flex flex-wrap gap-4 sm:gap-6 pt-12">
                            {[
                                { label: 'Github', href: 'https://github.com/ry-nl' },
                                { label: 'LinkedIn', href: 'https://linkedin.com/in/ry-nl' },
                                { label: 'rynldev@gmail.com', href: 'https://mail.google.com/mail/?view=cm&source=mailto&to=rynldev@gmail.com' },
                                { label: '+1 702 626 3161', href: '/contact' },
                                { label: 'Download CV', href: 'https://drive.google.com/file/d/1bL7hY_9-d8hVv4b2j8vsFqLUBJP8bH8K/view?usp=sharing' },
                            ].map(({ label, href }) => (
                                <MagneticButton
                                    key={label}
                                    onMouseEnter={() => setCursorVariant('link')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                >
                                    <a
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        className="group inline-flex items-center gap-3 px-8 py-3 border border-white/30 rounded-full text-sm tracking-widest uppercase font-light text-white/70 hover:text-white hover:border-white/60 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/30 transition-all duration-300 cursor-none"
                                    >
                                        {label} <span className="inline-block transition-transform duration-300 ease-out group-hover:-rotate-45">→</span>
                                    </a>
                                </MagneticButton>
                            ))}
                        </div>
                    </motion.div>
                    <div className="absolute flex justify-between bottom-0 p-6 w-full text-white/50 tracking-wide font-thin">
                        <h1 className="text-xs sm:text-sm">Based in Los Angeles, CA</h1>
                        <h1 className="hidden lg:block text-xs sm:text-sm">
                            Built with Next.js, Tailwind CSS, and Framer Motion
                        </h1>
                        <h1 className="text-xs sm:text-sm">© 2026 Ryan Lee - All Rights Reserved</h1>
                    </div>
                </section>
            </div>
        </motion.div>
    )
}
