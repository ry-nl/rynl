'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import ParallaxText from '../ParallaxText'
import StickyComponent from '../StickyComponent'
import { SlideButtonLightRight, SlideButtonDarkUp } from '../Buttons'

import PhotoWebsite from '@/public/photoWebsite.jpg'
import TeaWebsite from '@/public/teaWebsite.jpg'
import ArchWebsite from '@/public/archWebsite.jpg'
import CryptoWebsite from '@/public/cryptoWebsite.jpg'
import GalleryWebsite from '@/public/galleryWebsite.jpg'
import SocialWebsite from '@/public/socialWebsite.jpg'
import AWSLogo from '@/public/awsLogo.png'
import KiteLogo from '@/public/kiteLogo.jpg'

import { Menu, Circle } from '@mui/icons-material'

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
    const ref = useRef(null)
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    })
    const [cursorVariant, setCursorVariant] = useState('defaultLight')

    useEffect(() => {
        const mouseMove = (e: any) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            })
        }

        window.addEventListener('mousemove', mouseMove)

        return () => {
            window.removeEventListener('mousemove', mouseMove)
        }
    }, [])

    const cursorVariants = {
        defaultLight: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
        },
        defaultDark: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            backgroundColor: '#111111',
        },
        link: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            width: 32,
            height: 32,
            backgroundColor: '#2d86fa',
        },
    }

    const smallCursorVariants = {
        defaultLight: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
        },
        defaultDark: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            backgroundColor: '#111111',
        },
        link: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            width: 24,
            height: 24,
            backgroundColor: '#2d86fa',
        },
    }

    // nav button and nav menu effect
    const heroRef = useRef(null)
    const heroInView = useInView(heroRef)

    const [navModalOpen, setNavModalOpen] = useState(false)

    // website gallery horizontal translate effect
    const workRef1 = useRef(null)
    const workRef2 = useRef(null)

    const { scrollYProgress: workScrollYProgress1 } = useScroll({
        target: workRef1,
        offset: ['0 1', '1 0'],
    })

    const { scrollYProgress: workScrollYProgress2 } = useScroll({
        target: workRef2,
        offset: ['0 1', '1 0'],
    })

    const work1X = useTransform(workScrollYProgress1, [0, 1], ['4vw', '-4vw'])
    const work2X = useTransform(workScrollYProgress2, [0, 1], ['-4vw', '4vw'])

    // recent work hover effect
    const [workLinkHovered, setWorkLinkHovered] = useState(-1)

    const workLinkVariants = {
        default: {
            opacity: 1,
        },
        hovered: {
            opacity: 0.5,
        },
    }

    const workModalVariants = {
        visible: {
            width: '700px',
            height: '250px',
            opacity: 1,
        },
        hidden: {
            width: '350px',
            height: '125px',
            opacity: 0,
        },
    }

    // change screen color effect
    // const flavorRef = useRef(null)

    // const { scrollYProgress: flavorScrollProgress } = useScroll({
    //     target: flavorRef,
    //     offset: ['0 1', '0.5 1'],
    // })

    // const backgroundColor = useTransform(
    //     flavorScrollProgress,
    //     [0, 1],
    //     ['#EEEEEE', '#111111']
    // )

    // const textAndCursorColor = useTransform(
    //     flavorScrollProgress,
    //     [0, 1],
    //     ['#000000', '#EEEEEE']
    // )

    // flavor in view effect
    const flavorTextRef = useRef(null)

    const flavorTextInView = useInView(flavorTextRef, {
        margin: '0px 0px -200px 0px',
        once: true,
    })

    // RENDER
    return (
        <motion.div
            ref={ref}
            className="bg-light font-sans"
            // style={{
            //     backgroundColor: backgroundColor,
            //     color: textAndCursorColor,
            // }}
        >
            <motion.div
                className="cursor"
                variants={cursorVariants}
                animate={cursorVariant}
                transition={{
                    duration: 0,
                }}
            />
            <motion.div
                className="small-cursor flex justify-center items-center"
                variants={smallCursorVariants}
                animate={cursorVariant}
                transition={{
                    duration: 0.1,
                    ease: 'easeOut',
                }}
            >
                {/* <span>{cursorContent}</span> */}
            </motion.div>
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
                <div className="flex flex-col justify-center gap-24 w-full h-full p-24 text-4xl font-thin">
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
                </div>
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
                    <nav className="sticky flex justify-between top-0 inset-x-0 h-fit py-4 px-24 text-lg font-thin tracking-widest border-b border-white/50">
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
                    className="relative h-fit px-36 pt-12 pb-24 bg-light z-10"
                    onMouseEnter={() => setCursorVariant('defaultDark')}
                    onMouseLeave={() => setCursorVariant('defaultLight')}
                >
                    <div id="section-content" className="w-full h-full pt-48">
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
                            <h1 className="text-lg w-1/4 leading-relaxed">
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
                        className="flex-col justify-center items-center w-screen text-6xl font-light py-24"
                    >
                        <motion.div
                            ref={workRef1}
                            id="gallery-container1"
                            className="flex justify-center items-center w-full gap-x-8"
                            style={{ x: work1X }}
                        >
                            <Image
                                src={TeaWebsite}
                                alt="tea website"
                                className="object-cover h-[40vh] w-[33vw] p-6 bg-[#a3afb5]"
                            />
                            <Image
                                src={ArchWebsite}
                                alt="arch website"
                                className="object-cover h-[40vh] w-[33vw] p-6 bg-[#d1cac5]"
                            />
                            <Image
                                src={PhotoWebsite}
                                alt="photo website"
                                className="object-cover h-[40vh] w-[33vw] p-6 bg-[#574c43]"
                            />
                        </motion.div>
                        <motion.div
                            ref={workRef2}
                            id="gallery-container2"
                            className="flex justify-center items-center w-full gap-x-8 py-6"
                            style={{ x: work2X }}
                        >
                            <Image
                                src={CryptoWebsite}
                                alt="crypto website"
                                className="object-cover h-[40vh] w-[33vw] p-6 bg-[#7f997c]"
                            />
                            <Image
                                src={SocialWebsite}
                                alt="social website"
                                className="object-cover h-[40vh] w-[33vw] p-6 bg-[#84868c]"
                            />
                            <Image
                                src={GalleryWebsite}
                                alt="gallery website"
                                className="object-cover h-[40vh] w-[33vw] p-6 bg-[#ab9a9a]"
                            />
                        </motion.div>
                    </div>
                </section>
                <section
                    id="recent-work-section-container"
                    className="w-full h-[140vh] pt-16 pb-60 bg-light z-10"
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
                            <motion.div
                                className="relative flex items-center h-fit w-full px-24 py-4 border-solid border-y border-black/30"
                                onMouseEnter={() => {
                                    setWorkLinkHovered(0)
                                }}
                                onMouseLeave={() => {
                                    setWorkLinkHovered(-1)
                                }}
                            >
                                <motion.h1
                                    className="flex justify-between items-center w-full h-full"
                                    variants={workLinkVariants}
                                    animate={
                                        workLinkHovered == 0
                                            ? 'hovered'
                                            : 'default'
                                    }
                                >
                                    AWS
                                </motion.h1>
                                <motion.div
                                    className="relative flex justify-center items-center rounded-sm bg-[#f2f2f2] drop-shadow-2xl z-10"
                                    variants={workModalVariants}
                                    animate={
                                        workLinkHovered == 0
                                            ? 'visible'
                                            : 'hidden'
                                    }
                                    onMouseEnter={() => {
                                        setCursorVariant('link')
                                    }}
                                    onMouseLeave={() => {
                                        setCursorVariant('defaultDark')
                                    }}
                                >
                                    <motion.div
                                        className="absolute flex justify-center items-center opacity-0 inset-0 text-white text-2xl font-thin bg-black/60"
                                        whileHover={{
                                            opacity: 1,
                                            backdropFilter: 'blur(1px)',
                                            transition: { duration: 0.2 },
                                        }}
                                    >
                                        <Link
                                            className="flex w-full h-full justify-center items-center"
                                            href="https://aws.amazon.com/"
                                        >
                                            <h1 className="p-2">
                                                Visit Website
                                            </h1>
                                        </Link>
                                    </motion.div>
                                    <Image
                                        src={AWSLogo}
                                        alt="aws image"
                                        className="w-full px-6 object-cover"
                                    />
                                </motion.div>
                            </motion.div>
                            <motion.div
                                className="flex items-center h-fit px-24 py-4 border-solid border-b border-black/30"
                                onMouseEnter={() => {
                                    setWorkLinkHovered(1)
                                }}
                                onMouseLeave={() => {
                                    setWorkLinkHovered(-1)
                                }}
                            >
                                <motion.h1
                                    className="flex items-center w-full h-full"
                                    variants={workLinkVariants}
                                    animate={
                                        workLinkHovered == 1
                                            ? 'hovered'
                                            : 'default'
                                    }
                                >
                                    POLARITY
                                </motion.h1>
                                <motion.div
                                    className="relative flex justify-center items-center rounded-sm drop-shadow-2xl z-10"
                                    variants={workModalVariants}
                                    animate={
                                        workLinkHovered == 1
                                            ? 'visible'
                                            : 'hidden'
                                    }
                                    onMouseEnter={() => {
                                        setCursorVariant('link')
                                    }}
                                    onMouseLeave={() => {
                                        setCursorVariant('defaultDark')
                                    }}
                                >
                                    <motion.div
                                        className="absolute flex justify-center items-center opacity-0 inset-0 text-white text-2xl font-thin bg-black/60"
                                        whileHover={{
                                            opacity: 1,
                                            backdropFilter: 'blur(1px)',
                                            transition: { duration: 0.2 },
                                        }}
                                    >
                                        <Link
                                            className="flex w-full h-full justify-center items-center"
                                            href="https://aws.amazon.com/"
                                        >
                                            <h1 className="p-2">
                                                Visit Website
                                            </h1>
                                        </Link>
                                    </motion.div>
                                    <Image
                                        src={CryptoWebsite}
                                        alt="layr image"
                                        className="h-full object-cover"
                                    />
                                </motion.div>
                            </motion.div>
                            <motion.div
                                className="flex items-center h-fit px-24 py-4 border-solid border-b border-black/30"
                                onMouseEnter={() => {
                                    setWorkLinkHovered(2)
                                }}
                                onMouseLeave={() => {
                                    setWorkLinkHovered(-1)
                                }}
                            >
                                <motion.h1
                                    className="flex items-center w-full h-full"
                                    variants={workLinkVariants}
                                    animate={
                                        workLinkHovered == 2
                                            ? 'hovered'
                                            : 'default'
                                    }
                                >
                                    KITE
                                </motion.h1>
                                <motion.div
                                    className="relative flex justify-center items-center rounded-sm overflow-hidden bg-[#84868c] drop-shadow-2xl z-10"
                                    variants={workModalVariants}
                                    animate={
                                        workLinkHovered == 2
                                            ? 'visible'
                                            : 'hidden'
                                    }
                                    onMouseEnter={() => {
                                        setCursorVariant('link')
                                    }}
                                    onMouseLeave={() => {
                                        setCursorVariant('defaultDark')
                                    }}
                                >
                                    <motion.div
                                        className="absolute flex justify-center items-center opacity-0 inset-0 text-white text-2xl font-thin bg-black/60"
                                        whileHover={{
                                            opacity: 1,
                                            backdropFilter: 'blur(1px)',
                                            transition: { duration: 0.2 },
                                        }}
                                    >
                                        <Link
                                            className="flex w-full h-full justify-center items-center"
                                            href="https://aws.amazon.com/"
                                        >
                                            <h1 className="p-2">
                                                Visit Website
                                            </h1>
                                        </Link>
                                    </motion.div>
                                    <Image
                                        src={KiteLogo}
                                        alt="bulletin image"
                                        className="h-full object-cover"
                                    />
                                </motion.div>
                            </motion.div>
                            <div
                                id="more-work-button-container"
                                className="flex justify-center w-full py-16 font-thin tracking-wide text-xl"
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
                                        href="https://drive.google.com/file/d/1bL7hY_9-d8hVv4b2j8vsFqLUBJP8bH8K/view?usp=drive_link"
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
                                    className="flex justify-center font-thin tracking-wide text-xl"
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
                                    className="flex justify-center font-thin tracking-wide text-xl"
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
                                            buttonText="Linkedin"
                                            link="https://linkedin.com/in/ry-nl"
                                            popupText="→"
                                        />
                                    </div>
                                </div>
                                {/* <div
                                    id="phone-button-container"
                                    className="flex justify-center font-thin tracking-wide text-xl"
                                >
                                    <div
                                        className="w-full"
                                        onMouseEnter={() => {
                                            setCursorVariant('link')
                                        }}
                                        onMouseLeave={() => {
                                            setCursorVariant('defaultLight')
                                        }}
                                    >
                                    </div>
                                </div> */}
                                <div
                                    id="email-button-container"
                                    className="flex justify-center font-thin tracking-wide text-xl"
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
                                    className="flex justify-center font-thin tracking-wide text-xl"
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
                        <h1 className="hidden md:block">
                            Built with Next.js, Tailwind CSS, and Framer Motion
                        </h1>
                        <h1>© 2025 Ryan Lee - All Rights Reserved</h1>
                    </div>
                </section>
            </div>
        </motion.div>
    )
}
