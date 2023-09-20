'use client'
import { useState, useEffect, useRef } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    easeInOut,
    circInOut,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import CodeIcon from '@mui/icons-material/Code'

import ParallaxText from '../ParallaxText'
import StickyComponent from '../StickyComponent'
import { SlideButton } from '../Buttons'

import PhotoWebsite from '@/public/photoWebsite.jpg'
import TeaWebsite from '@/public/teaWebsite.jpg'
import ArchWebsite from '@/public/archWebsite.jpg'
import CryptoWebsite from '@/public/cryptoWebsite.jpg'
import GalleryWebsite from '@/public/galleryWebsite.jpg'
import SocialWebsite from '@/public/socialWebsite.jpg'

import layrImage from '@/public/layr.jpg'
import layrHomepageImage from '@/public/layrHomepage.jpg'
import awsImage from '@/public/aws1.png'
import recoverImage from '@/public/recover1.jpg'

import LanguageIcon from '@mui/icons-material/Language'
import { ExpandMore } from '@mui/icons-material'
import InfoSection from './Sections/InfoSection'

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
            // opacity: 0,
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
            // filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
            // color: 'white',
            // fontWeight: '300',
            // fontSize: '20px',
            // letterSpacing: '0.025em',
        },
    }

    // website gallery horizontal translate effect
    const workRef = useRef(null)

    const { scrollYProgress: workScrollYProgress } = useScroll({
        target: workRef,
        offset: ['0 1', '1 0'],
    })

    const work1X = useTransform(workScrollYProgress, [0, 1], ['0', '-130px'])
    const work2X = useTransform(workScrollYProgress, [0, 1], ['0', '130px'])

    // recent work hover effect
    const [workLinkHovered, setWorkLinkHovered] = useState(-1)
    const [cursorContent, setCursorContent] = useState('')

    const workLinkVariants = {
        default: {
            x: 0,
            opacity: 1,
        },
        hovered: {
            x: -24,
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

    // flavor in view  effect
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
                    duration: 0.1,
                }}
            />
            <motion.div
                className="small-cursor flex justify-center items-center"
                variants={smallCursorVariants}
                animate={cursorVariant}
                transition={{
                    duration: 0.15,
                    ease: 'easeOut',
                }}
            >
                {/* <span>{cursorContent}</span> */}
            </motion.div>
            <section
                id="hero-section-container"
                className="relative h-screen w-screen text-white"
            >
                <motion.video
                    ref={videoRef}
                    playsInline
                    autoPlay
                    muted
                    loop
                    className="absolute top-0 left-0 w-full h-[120vh] object-cover contrast-[105%] brightness-[60%] grayscale-[25%] z-0"
                    style={{ y: videoY }}
                >
                    <source src="/bg-video-720.mp4" type="video/mp4" />
                </motion.video>
                <nav className="sticky flex justify-between top-0 inset-x-0 h-fit py-4 px-24 text-lg font-light border-b border-white/50">
                    <h1>HOME</h1>
                    <h1>WORK</h1>
                    <h1>ABOUT</h1>
                    <h1>CONTACT</h1>
                </nav>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center tracking-wide z-10">
                    <div className="flex justify-center font-normal text-8xl pt-6">
                        RYAN LEE
                    </div>
                    <div className="font-thin text-3xl pt-6 text-white/60">
                        SOFTWARE DEVELOPER & UI/UX DESIGNER
                    </div>
                    {/* <div className="font-thin text-5xl pt-6 text-white/60">
                        UI/UX DESIGNER
                    </div> */}
                </div>
                {/* <div className="absolute right-24 bottom-28 font-thin text-2xl z-10 hidden lg:block">
                    <div className="pb-12">Based in Los Angeles, CA</div>
                    <div>University of Southern California,</div>
                    <div>B.S. Computer Science</div>
                </div> */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <ExpandMore className="w-12 h-12" />
                </div>
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
                            back-end systems. Software solutions that are both
                            compelling and reliable.
                        </h1>
                        <h1 className="text-lg w-1/4 leading-relaxed">
                            My passion lies in making products that people love
                            using and developers enjoy maintaining.
                        </h1>
                    </motion.div>
                </div>
            </section>
            <section
                ref={workRef}
                id="work-section-container"
                className="relative flex h-fit bg-light z-10"
                onMouseEnter={() => setCursorVariant('defaultDark')}
                onMouseLeave={() => setCursorVariant('defaultLight')}
            >
                <div
                    id="section-content"
                    className="w-screen text-6xl font-light py-24"
                >
                    <motion.div
                        id="gallery-container1"
                        className="flex w-full gap-x-8"
                        style={{ x: work1X }}
                    >
                        <Image
                            src={TeaWebsite}
                            alt="tea website"
                            className="object-cover h-[20rem] w-[33rem] p-6 bg-[#a3afb5]"
                        />
                        <Image
                            src={ArchWebsite}
                            alt="arch website"
                            className="object-cover h-[20rem] w-[33rem] p-6 bg-[#d1cac5]"
                        />
                        <Image
                            src={PhotoWebsite}
                            alt="photo website"
                            className="object-cover h-[20rem] w-[33rem] p-6 bg-[#574c43]"
                        />
                    </motion.div>
                    <motion.div
                        id="gallery-container2"
                        className="flex justify-end w-full gap-x-8 py-6"
                        style={{ x: work2X }}
                    >
                        <Image
                            src={CryptoWebsite}
                            alt="crypto website"
                            className="object-cover h-[20rem] w-[33rem] p-6 bg-[#7f997c]"
                        />
                        <Image
                            src={SocialWebsite}
                            alt="social website"
                            className="object-cover h-[20rem] w-[33rem] p-6 bg-[#84868c]"
                        />
                        <Image
                            src={GalleryWebsite}
                            alt="gallery website"
                            className="object-cover h-[20rem] w-[33rem] p-6 bg-[#ab9a9a]"
                        />
                    </motion.div>
                </div>
            </section>
            <section
                id="recent-work-section-container"
                className="relative h-fit pt-16 pb-60 bg-light z-10"
                onMouseEnter={() => setCursorVariant('defaultDark')}
                onMouseLeave={() => setCursorVariant('defaultLight')}
            >
                <div
                    id="content"
                    className="h-fit w-full px-24 text-7xl font-light tracking-wide"
                >
                    <h1 className="text-lg pl-8 tracking-normal">
                        recent work
                    </h1>
                    <motion.div
                        className="relative flex items-center h-40 w-full px-24 border-solid border-y border-black/30"
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
                                workLinkHovered == 0 ? 'hovered' : 'default'
                            }
                        >
                            Warden
                        </motion.h1>
                        <motion.div
                            className="flex justify-center items-center rounded-sm bg-[#d1cac5] drop-shadow-2xl z-10"
                            variants={workModalVariants}
                            animate={
                                workLinkHovered == 0 ? 'visible' : 'hidden'
                            }
                            onMouseEnter={() => {
                                setCursorVariant('link')
                            }}
                            onMouseLeave={() => {
                                setCursorVariant('defaultDark')
                            }}
                        >
                            <Image
                                src={awsImage}
                                alt="aws image"
                                className="w-full px-6 object-cover"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="flex items-center h-40 px-24 border-solid border-b border-black/30"
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
                                workLinkHovered == 1 ? 'hovered' : 'default'
                            }
                        >
                            Layr
                        </motion.h1>
                        <motion.div
                            className="flex justify-center items-center rounded-sm drop-shadow-2xl z-10"
                            variants={workModalVariants}
                            animate={
                                workLinkHovered == 1 ? 'visible' : 'hidden'
                            }
                            onMouseEnter={() => {
                                setCursorVariant('link')
                            }}
                            onMouseLeave={() => {
                                setCursorVariant('defaultDark')
                            }}
                        >
                            <Image
                                src={CryptoWebsite}
                                alt="layr image"
                                className="h-full object-cover"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="flex items-center h-40 px-24 border-solid border-b border-black/30"
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
                                workLinkHovered == 2 ? 'hovered' : 'default'
                            }
                        >
                            Bulletin
                        </motion.h1>
                        <motion.div
                            className="flex justify-center items-center rounded-sm overflow-hidden bg-[#84868c] drop-shadow-2xl z-10"
                            variants={workModalVariants}
                            animate={
                                workLinkHovered == 2 ? 'visible' : 'hidden'
                            }
                            onMouseEnter={() => {
                                setCursorVariant('link')
                            }}
                            onMouseLeave={() => {
                                setCursorVariant('defaultDark')
                            }}
                        >
                            <Image
                                src={SocialWebsite}
                                alt="bulletin image"
                                className="h-full object-cover"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="flex items-center h-40 px-24 border-solid border-b border-black/30"
                        onMouseEnter={() => {
                            setWorkLinkHovered(3)
                        }}
                        onMouseLeave={() => {
                            setWorkLinkHovered(-1)
                        }}
                    >
                        <motion.h1
                            className="flex items-center w-full h-full"
                            variants={workLinkVariants}
                            animate={
                                workLinkHovered == 3 ? 'hovered' : 'default'
                            }
                        >
                            ReCOVER
                        </motion.h1>
                        <motion.div
                            className="flex justify-center items-center rounded-sm overflow-hidden bg-[#84868c] drop-shadow-2xl z-10"
                            variants={workModalVariants}
                            animate={
                                workLinkHovered == 3 ? 'visible' : 'hidden'
                            }
                            onMouseEnter={() => {
                                setCursorVariant('link')
                            }}
                            onMouseLeave={() => {
                                setCursorVariant('defaultDark')
                            }}
                        >
                            <Image
                                src={recoverImage}
                                alt="recover image"
                                className="h-full object-cover"
                            />
                        </motion.div>
                    </motion.div>
                    <div
                        id="github-button-container"
                        className="flex justify-center w-full py-16 font-thin text-2xl"
                    >
                        <div
                            onMouseEnter={() => {
                                setCursorVariant('link')
                            }}
                            onMouseLeave={() => {
                                setCursorVariant('defaultDark')
                            }}
                        >
                            <SlideButton buttonText="more work" />
                        </div>
                    </div>
                </div>
            </section>
            <section
                id="info-section-container"
                className="relative flex justify-between h-screen px-12 bg-dark"
            >
                <InfoSection />
            </section>
        </motion.div>
    )
}
