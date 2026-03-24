'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'

import ParallaxText from './components/ParallaxText'
import StickyComponent from './components/StickyComponent'
import { SlideButtonLightRight, SlideButtonDarkUp } from './components/Buttons'
import Cursor from './components/Cursor'

import PhotoWebsite from '@/public/photoWebsite.jpg'
import TeaWebsite from '@/public/teaWebsite.jpg'
import ArchWebsite from '@/public/archWebsite.jpg'
import CryptoWebsite from '@/public/cryptoWebsite.jpg'
import GalleryWebsite from '@/public/galleryWebsite.jpg'
import SocialWebsite from '@/public/socialWebsite.jpg'

import { Menu, Circle } from '@mui/icons-material'
import { StaticImageData } from 'next/image'

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
        { src: SocialWebsite, alt: 'social website', bgColor: '#84868c' },
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
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        index % 2 === 0 ? ['4vw', '-4vw'] : ['-4vw', '4vw']
    )
    const imageWidth = `${Math.ceil(120 / images.length)}vw`

    return (
        <motion.div
            ref={ref}
            className={`flex justify-center gap-x-6 ${index > 0 ? 'py-8' : ''}`}
            style={{ x }}
        >
            {images.map((img) => (
                <Image
                    key={img.alt}
                    src={img.src}
                    alt={img.alt}
                    className="object-cover h-[40vh] shrink-0 p-3"
                    style={{ backgroundColor: img.bgColor, width: imageWidth }}
                    sizes={imageWidth}
                />
            ))}
        </motion.div>
    )
}

const experienceEntries = [
    { name: 'SALESFORCE', link: 'https://www.salesforce.com/' },
    { name: 'AWS', link: 'https://aws.amazon.com/' },
    { name: 'POLARITY', link: 'https://polarity.io/' },
    { name: 'KITE', link: 'https://www.kite.com/' },
]

export default function Landing() {
    // background video effect
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        // playback speed
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5
        }
    })

    const { scrollYProgress: videoScrollYProgress } = useScroll({
        target: videoRef,
        offset: ['0 0', '1 0'],
    })

    const videoY = useTransform(videoScrollYProgress, [0, 1], ['0', '550px'])

    // cursor effect
    const [cursorVariant, setCursorVariant] = useState('defaultLight')

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

    // RENDER
    return (
        <motion.div ref={ref} className="bg-light font-sans">
            <Cursor cursorVariant={cursorVariant} />
            <motion.div
                id="nav-button"
                className="fixed flex justify-center items-center top-12 right-12 w-20 h-20 bg-white rounded-full shadow-xl z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: heroInView ? 0 : 1,
                    scale: heroInView ? 0 : 1,
                }}
                whileHover={{
                    scale: 1.1,
                }}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={() => setCursorVariant('defaultDark')}
                onClick={() => setNavModalOpen(true)}
            >
                <Menu />
            </motion.div>
            <motion.div
                className="fixed top-0 right-0 w-1/3 h-screen bg-dark text-white font-light shadow-2xl z-30"
                initial={{ x: '100%' }}
                animate={{
                    x: navModalOpen ? '0%' : '100%',
                }}
                transition={{ ease: 'circOut' }}
                onMouseEnter={() => setCursorVariant('defaultLight')}
                onMouseLeave={() => setCursorVariant('defaultDark')}
            >
                <nav className="flex flex-col justify-center gap-24 w-full h-full p-24 text-4xl font-thin">
                    <motion.a
                        href={'/work'}
                        className="flex gap-4 items-center w-fit cursor-none"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('defaultLight')}
                        whileHover={{
                            translateX: 10,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <Circle className="w-[8px] h-[8px]" /> WORK
                    </motion.a>
                    <motion.a
                        href={'/about'}
                        className="flex gap-4 items-center w-fit cursor-none"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('defaultLight')}
                        whileHover={{
                            translateX: 10,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <Circle className="w-[8px] h-[8px]" /> ABOUT
                    </motion.a>
                    <motion.a
                        href={'/contact'}
                        className="flex gap-4 items-center w-fit cursor-none"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('defaultLight')}
                        whileHover={{
                            translateX: 10,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <Circle className="w-[8px] h-[8px]" /> CONTACT
                    </motion.a>
                    <motion.a
                        href={'/'}
                        className="flex gap-4 items-center w-fit cursor-none"
                        onMouseEnter={() => setCursorVariant('link')}
                        onMouseLeave={() => setCursorVariant('defaultLight')}
                        whileHover={{
                            translateX: 10,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <Circle className="w-[8px] h-[8px]" /> BACK TO TOP
                    </motion.a>
                </nav>
            </motion.div>
            {navModalOpen && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-screen bg-black/30 z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setNavModalOpen(false)}
                />
            )}
            <div className="z-10" onClick={() => setNavModalOpen(false)}>
                <section
                    ref={heroRef}
                    id="hero-section-container"
                    className="relative h-screen w-screen text-white"
                >
                    <motion.video
                        ref={videoRef}
                        playsInline
                        autoPlay
                        muted
                        loop
                        className="absolute top-0 left-0 w-full h-[120vh] object-cover contrast-[105%] brightness-[65%] grayscale-[25%]"
                        style={{ y: videoY }}
                    >
                        <source src="/bg-video-720.mp4" type="video/mp4" />
                    </motion.video>
                    <nav className="sticky flex justify-between top-0 inset-x-0 h-fit py-4 px-24 text-lg font-thin tracking-widest border-b border-white/50 z-20">
                        <motion.a
                            href="/"
                            className="nav-button"
                            onMouseEnter={() => {
                                setCursorVariant('link')
                            }}
                            onMouseLeave={() => {
                                setCursorVariant('defaultLight')
                            }}
                        >
                            HOME
                        </motion.a>
                        <motion.a
                            href="/work"
                            className="nav-button"
                            onMouseEnter={() => {
                                setCursorVariant('link')
                            }}
                            onMouseLeave={() => {
                                setCursorVariant('defaultLight')
                            }}
                        >
                            WORK
                        </motion.a>
                        <motion.a
                            href="/about"
                            className="nav-button"
                            onMouseEnter={() => {
                                setCursorVariant('link')
                            }}
                            onMouseLeave={() => {
                                setCursorVariant('defaultLight')
                            }}
                        >
                            ABOUT
                        </motion.a>
                        <motion.a
                            href="/contact"
                            className="nav-button"
                            onMouseEnter={() => {
                                setCursorVariant('link')
                            }}
                            onMouseLeave={() => {
                                setCursorVariant('defaultLight')
                            }}
                        >
                            CONTACT
                        </motion.a>
                    </nav>
                    <div className="absolute bottom-0 text-white/20 tracking-tight">
                        <ParallaxText baseVelocity={1}>
                            SOFTWARE DEVELOPER - UI/UX DESIGNER -
                        </ParallaxText>
                    </div>
                    <div className="absolute left-24 top-1/2 -translate-y-1/2 tracking-wide z-10">
                        <div className="flex gap-6 items-center font-normal text-8xl">
                            <h1>RYAN LEE</h1>
                        </div>
                        <div className="font-thin text-3xl pt-6 text-white/70">
                            SOFTWARE DEVELOPER & UI/UX DESIGNER
                        </div>
                        {/* <div className="font-thin text-5xl pt-6 text-white/60">
                        UI/UX DESIGNER
                    </div> */}
                    </div>
                    <div className="absolute right-24 top-1/2 -translate-y-1/2 font-thin text-2xl text-white/70 z-10 hidden lg:block">
                        <div className="pb-12">Based in San Francisco, CA</div>
                        <div>University of Southern California,</div>
                        <div>B.S. Computer Science</div>
                    </div>
                    {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <ExpandMore className="w-12 h-12" />
                </div> */}
                </section>
                <section
                    id="flavor-section-container"
                    className="relative h-fit px-36 py-12 bg-light z-10"
                    onMouseEnter={() => setCursorVariant('defaultDark')}
                    onMouseLeave={() => setCursorVariant('defaultLight')}
                >
                    <div id="section-content" className="w-full h-full py-36">
                        <motion.div
                            ref={flavorTextRef}
                            id="flavor-text"
                            className="flex justify-between items-center gap-24 font-light"
                            style={{
                                translateY: flavorTextInView ? '0px' : '50px',
                                opacity: flavorTextInView ? '1' : '0',
                                transition: '0.8s',
                            }}
                        >
                            <h1 className="text-4xl w-3/4 leading-relaxed">
                                User first, always. I am committed to creating
                                intuitive front-end experiences and effective
                                back-end systems. Software solutions that are
                                both compelling and reliable.
                            </h1>
                            <h1 className="text-lg w-1/4 leading-relaxed hidden lg:block">
                                My passion lies in making products that people
                                love using and developers enjoy maintaining.
                            </h1>
                        </motion.div>
                    </div>
                </section>
                <section
                    id="work-section-container"
                    className="relative h-fit bg-light z-10"
                    onMouseEnter={() => setCursorVariant('defaultDark')}
                    onMouseLeave={() => setCursorVariant('defaultLight')}
                >
                    <div
                        id="section-content"
                        className="flex-col justify-center items-center w-screen text-6xl font-light py-12"
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
                    className="w-full py-36 pb-60 bg-light z-10"
                    onMouseEnter={() => setCursorVariant('defaultDark')}
                    onMouseLeave={() => setCursorVariant('defaultLight')}
                >
                    <div
                        id="section-content"
                        className="w-full h-full px-24 text-7xl font-light tracking-wide"
                    >
                        <h1 className="text-lg pl-24 pb-8 tracking-normal text-black/50">
                            EXPERIENCE
                        </h1>
                        <div className="flex flex-col">
                            {experienceEntries.map((entry, index) => (
                                <motion.a
                                    key={entry.name}
                                    href={entry.link}
                                    className={`flex items-center w-full px-24 border-solid border-black/30 cursor-none ${
                                        index === 0 ? 'border-y' : 'border-b'
                                    }`}
                                    animate={{
                                        paddingTop:
                                            workLinkHovered === index
                                                ? '2rem'
                                                : '1rem',
                                        paddingBottom:
                                            workLinkHovered === index
                                                ? '2rem'
                                                : '1rem',
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                    onMouseEnter={() => {
                                        setWorkLinkHovered(index)
                                        setCursorVariant('link')
                                    }}
                                    onMouseLeave={() => {
                                        setWorkLinkHovered(-1)
                                        setCursorVariant('defaultDark')
                                    }}
                                >
                                    <div className="w-full flex justify-start">
                                        <motion.h1
                                            animate={{
                                                x:
                                                    workLinkHovered === index
                                                        ? '3rem'
                                                        : '0rem',
                                                scale:
                                                    workLinkHovered === index
                                                        ? 1.12
                                                        : 1,
                                                opacity:
                                                    workLinkHovered === -1
                                                        ? 1
                                                        : workLinkHovered ===
                                                            index
                                                          ? 1
                                                          : 0.2,
                                            }}
                                            className="font-light origin-center"
                                            transition={{
                                                duration: 0.4,
                                                ease: [0.25, 0.46, 0.45, 0.94],
                                            }}
                                        >
                                            {entry.name}
                                        </motion.h1>
                                    </div>
                                </motion.a>
                            ))}
                            <div
                                id="more-work-button-container"
                                className="flex justify-center w-full pt-16 font-thin tracking-wide text-xl"
                            >
                                <div
                                    onMouseEnter={() => {
                                        setCursorVariant('link')
                                    }}
                                    onMouseLeave={() => {
                                        setCursorVariant('defaultDark')
                                    }}
                                >
                                    <SlideButtonLightRight
                                        buttonText="MORE WORK"
                                        link="https://github.com/ry-nl"
                                        popupText="→"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="info-section-container"
                    className="relative flex justify-between h-screen bg-dark"
                    onMouseEnter={() => {
                        setCursorVariant('defaultLight')
                    }}
                    onMouseLeave={() => {
                        setCursorVariant('defaultDark')
                    }}
                >
                    <div
                        id="section-content"
                        className="flex flex-col justify-center w-full h-full text-white px-36"
                    >
                        <div className="text-white font-thin pb-24 border-b">
                            <h1 className="pb-8 text-3xl text-white/70">
                                Thanks for stopping by!
                            </h1>
                            <h1 className="text-7xl font-light">
                                Let&apos;s Make Great Things.
                            </h1>
                        </div>
                        <div className="relative flex justify-end items-center text-black font-thin text-xl drop-shadow-2xl z-20">
                            <div className="absolute pr-24">
                                <StickyComponent>
                                    <motion.a
                                        className="flex justify-center items-center h-48 w-48 bg-light rounded-full"
                                        whileHover={{
                                            backgroundColor: '#2d86fa',
                                        }}
                                        href="https://drive.google.com/file/d/1bL7hY_9-d8hVv4b2j8vsFqLUBJP8bH8K/view?usp=sharing"
                                        target="_blank"
                                    >
                                        download cv
                                    </motion.a>
                                </StickyComponent>
                            </div>
                        </div>
                        <div className="text-white text-4xl font-light pt-24">
                            <div className="flex gap-8">
                                <div
                                    id="github-button-container"
                                    className="flex shrink-0 font-thin tracking-wide text-xl"
                                >
                                    <div
                                        onMouseEnter={() => {
                                            setCursorVariant('link')
                                        }}
                                        onMouseLeave={() => {
                                            setCursorVariant('defaultLight')
                                        }}
                                    >
                                        <SlideButtonDarkUp
                                            buttonText="Github"
                                            link="https://github.com/ry-nl"
                                            popupText="→"
                                        />
                                    </div>
                                </div>
                                <div
                                    id="linkedin-button-container"
                                    className="flex shrink-0 font-thin tracking-wide text-xl"
                                >
                                    <div
                                        onMouseEnter={() => {
                                            setCursorVariant('link')
                                        }}
                                        onMouseLeave={() => {
                                            setCursorVariant('defaultLight')
                                        }}
                                    >
                                        <SlideButtonDarkUp
                                            buttonText="LinkedIn"
                                            link="https://linkedin.com/in/ry-nl"
                                            popupText="→"
                                        />
                                    </div>
                                </div>
                                <div
                                    id="email-button-container"
                                    className="flex shrink-0 font-thin tracking-wide text-xl"
                                >
                                    <div
                                        onMouseEnter={() => {
                                            setCursorVariant('link')
                                        }}
                                        onMouseLeave={() => {
                                            setCursorVariant('defaultLight')
                                        }}
                                    >
                                        <SlideButtonDarkUp
                                            buttonText="rynldev@gmail.com"
                                            link="https://mail.google.com/mail/?view=cm&source=mailto&to=rynldev@gmail.com"
                                            popupText="@"
                                        />
                                    </div>
                                </div>
                                <div
                                    id="phone-button-container"
                                    className="flex shrink-0 font-thin tracking-wide text-xl"
                                >
                                    <div
                                        onMouseEnter={() => {
                                            setCursorVariant('link')
                                        }}
                                        onMouseLeave={() => {
                                            setCursorVariant('defaultLight')
                                        }}
                                    >
                                        <SlideButtonDarkUp
                                            buttonText="+1 702 626 3161"
                                            link="/contact"
                                            popupText="→"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute flex justify-between bottom-0 p-6 w-full text-white/50 tracking-wide font-thin">
                        <h1>Based in San Francisco, CA</h1>
                        <h1 className="hidden lg:block">
                            Built with Next.js, Tailwind CSS, and Framer Motion
                        </h1>
                        <h1>© 2025 Ryan Lee - All Rights Reserved</h1>
                    </div>
                </section>
            </div>
        </motion.div>
    )
}
