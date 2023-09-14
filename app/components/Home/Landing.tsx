'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import Navbar from '../Navbar'
import HeroPic from 'public/hero.jpg'
import ParallaxText from '../ParallaxText'

import Image1 from '@/public/website1.jpg'
import Image2 from '@/public/website2.jpg'
import Image4 from '@/public/website4.jpg'
import Image5 from '@/public/website5.jpg'
import Aws from '@/public/aws.png'
import Aws1 from '@/public/aws1.png'

// import HeroSection from './Sections/HeroSection'
// import FlavorSection from './Sections/FlavorSection'
// import WorkSection from './Sections/WorkSection'
import InfoSection from './Sections/InfoSection'

export default function Landing() {
    // REFS
    const ref = useRef(null)
    const flavorRef = useRef(null)
    const flavorImageRef = useRef(null)
    const infoRef = useRef(null)

    // STATES
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    })
    const [cursorVariant, setCursorVariant] = useState('default')
    const [workLinkHovered, setWorkLinkHovered] = useState(-1)
    const [cursorContent, setCursorContent] = useState('')

    // hooks
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

    const { scrollYProgress: heroYProgress } = useScroll({
        target: flavorRef,
        offset: ['start end', 'end start'],
    })
    const { scrollYProgress: workYProgress } = useScroll({
        target: infoRef,
        offset: ['start end', 'end end'],
    })

    const flavorY = useTransform(heroYProgress, [0, 1], ['0px', '-1600px'])
    const infoY = useTransform(workYProgress, [0, 1], ['0px', '-600px'])

    const flavorImagesInView = useInView(flavorImageRef, { once: true })

    // VARIANTS
    const cursorVariants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
        },
        link: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            backgroundColor: '#1a74eb',
        },
        hero: {
            height: 160,
            width: 160,
            x: mousePosition.x - 80,
            y: mousePosition.y - 80,
            backgroundColor: '#EEEEEE',
            mixBlendMode: 'difference',
        },
        flavor: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            backgroundColor: '#EEEEEE',
            mixBlendMode: 'difference',
        },
        work: {
            x: mousePosition.x - 250,
            y: mousePosition.y - 150,
            width: 500,
            height: 300,
            borderRadius: 0,
            backgroundColor: 'rgba(30, 30, 30, 1)',
            // backdropFilter: 'blur(3px)',
            // x: mousePosition.x - 80,
            // y: mousePosition.y - 80,
            // width: 160,
            // height: 160,
            // backgroundColor: '#1a74eb',
        },
    }

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

    // COMPONENTS
    // function WardenContent() {
    //     return (
    //         <motion.div className="flex flex-col justify-center items-center gap-y-12 h-full w-full p-12">
    //             {/* <Image src={Aws1} alt="AWS" className="w-full" /> */}
    //             {/* <motion.div className="absolute flex justify-center items-center left-1/2 -bottom-20 rounded-full -translate-x-1/2 w-36 h-36 bg-blue-500">
    //                 <h1 className="text-lg text-white">More</h1>
    //             </motion.div> */}
    //         </motion.div>
    //     )
    // }

    // RENDER
    return (
        <div ref={ref}>
            <motion.div
                className="cursor flex justify-center items-center"
                variants={cursorVariants}
                animate={cursorVariant}
                transition={{
                    duration: 0.1,
                }}
            >
                <div className="cursorText h-full w-full text-2xl font-light">
                    {cursorContent}
                </div>
            </motion.div>
            <div id="hero-section-container">
                <section className="h-[105vh] px-24">
                    <div id="content" className="relative h-screen py-10">
                        <nav
                            id="nav-container"
                            className="absolute top-0 h-12 w-1/2 font-light text-base pr-24"
                        >
                            <motion.ul
                                id="link-container"
                                className="flex justify-between items-center h-full"
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <motion.li
                                    whileHover={{ y: 4, opacity: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    onMouseEnter={() => {
                                        setCursorVariant('link')
                                    }}
                                    onMouseLeave={() => {
                                        setCursorVariant('default')
                                    }}
                                >
                                    <Link href="work">
                                        <h1 className="">Work</h1>
                                    </Link>
                                </motion.li>
                                <motion.li
                                    whileHover={{ y: 4, opacity: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    onMouseEnter={() => {
                                        setCursorVariant('link')
                                    }}
                                    onMouseLeave={() => {
                                        setCursorVariant('default')
                                    }}
                                >
                                    <Link href="about">
                                        <h1 className="">About</h1>
                                    </Link>
                                </motion.li>
                                <motion.li
                                    whileHover={{ y: 4, opacity: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    onMouseEnter={() => {
                                        setCursorVariant('link')
                                    }}
                                    onMouseLeave={() => {
                                        setCursorVariant('default')
                                    }}
                                >
                                    <Link href="contact">
                                        <h1 className="">Contact</h1>
                                    </Link>
                                </motion.li>
                            </motion.ul>
                        </nav>
                        <motion.div
                            className="flex flex-col justify-end h-full w-1/2 font-light leading-tight"
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                duration: 1,
                            }}
                        >
                            <h1 className="text-3xl mb-4">Ryan Lee ©</h1>

                            <h1
                                className="text-8xl w-[29rem]"
                                onMouseEnter={() => {
                                    setCursorVariant('hero')
                                }}
                                onMouseLeave={() => {
                                    setCursorVariant('default')
                                }}
                            >
                                Full-Stack Software Developer
                            </h1>
                        </motion.div>
                        <div className="absolute h-full top-0 right-0 aspect-[3/4]">
                            <motion.div
                                className="absolute left-0 bg-light w-full h-full z-10"
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{
                                    duration: 1,
                                    ease: 'easeInOut',
                                }}
                            />
                            <Image
                                src={HeroPic}
                                alt="Ryan Lee"
                                className="absolute right-0 h-full w-full py-12 object-cover z-0"
                            />
                        </div>
                    </div>
                </section>
            </div>
            <motion.div
                id="flavor-section-container"
                ref={flavorRef}
                className="absolute z-10 w-screen drop-shadow-2xl backdrop-blur-lg shadow-2xl"
                style={{ y: flavorY }}
            >
                <section
                    className="flex justify-center items-center h-fit w-full bg-dark/30"
                    onMouseEnter={() => {
                        setCursorVariant('flavor')
                    }}
                    onMouseLeave={() => {
                        setCursorVariant('default')
                    }}
                >
                    <div
                        id="content"
                        className="flex justify-center items-center h-fit py-24 w-full"
                    >
                        <div className="relative h-full w-full text-8xl text-white">
                            <div
                                id="parallax-text"
                                className="w-full font-light"
                            >
                                <ParallaxText baseVelocity={-2}>
                                    Effective Backend Solutions ·
                                </ParallaxText>
                                <ParallaxText baseVelocity={2}>
                                    Intuitive Frontend Designs ·
                                </ParallaxText>
                            </div>
                            <div
                                ref={flavorImageRef}
                                className="flex relative justify-evenly items-center w-screen pt-12"
                            >
                                {/* <div className="absolute flex justify-center items-center left-0 h-24 w-12 rounded-r-lg bg-dark opacity-20">
                                    <h1 className="opacity-100 text-4xl">◀</h1>
                                </div>
                                <div className="absolute flex justify-center items-center right-0 h-24 w-12 rounded-l-lg bg-dark opacity-20">
                                    <h1 className="opacity-100 text-4xl">▶</h1>
                                </div> */}
                                <motion.div
                                    className="flex items-center gap-x-16 p-8 h-fit w-full overflow-x-scroll no-scrollbar"
                                    // style={{
                                    //     transform: flavorImagesInView
                                    //         ? 'none'
                                    //         : 'translateX(-100px)',
                                    //     opacity: flavorImagesInView ? 1 : 0,
                                    //     transition:
                                    //         'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
                                    // }}
                                >
                                    <Image
                                        src={Image5}
                                        alt="Image 5"
                                        className="h-96 w-fit shadow-lg"
                                    />
                                    <Image
                                        src={Image2}
                                        alt="Image 2"
                                        className="h-96 w-fit shadow-lg"
                                    />
                                    <Image
                                        src={Image4}
                                        alt="Image 4"
                                        className="h-96 w-fit shadow-lg"
                                    />
                                    <Image
                                        src={Image1}
                                        alt="Image 1"
                                        className="h-96 w-fit shadow-lg"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </motion.div>
            <div id="work-section-container" className="relative z-0">
                <section className="relative flex items-center h-section pt-24">
                    <div
                        id="content"
                        className="h-screen w-full text-7xl font-light px-24"
                    >
                        <h1 className="text-base pl-8">recent work</h1>
                        <motion.div
                            className="relative flex items-center h-48 w-full px-24 border-solid border-y border-gray-400"
                            onHoverStart={() => {
                                setCursorVariant('work')
                                setWorkLinkHovered(0)
                                setCursorContent('warden')
                            }}
                            onHoverEnd={() => {
                                setCursorVariant('default')
                                setWorkLinkHovered(-1)
                                setCursorContent('')
                            }}
                        >
                            <motion.h1
                                className="flex items-center w-full h-full"
                                variants={workLinkVariants}
                                animate={
                                    workLinkHovered == 0 ? 'hovered' : 'default'
                                }
                                transition={{ duration: 0.2 }}
                            >
                                Warden
                            </motion.h1>
                        </motion.div>
                        <motion.div
                            className="flex items-center h-48 px-24 border-solid border-b border-gray-400"
                            onHoverStart={() => {
                                setCursorVariant('work')
                                setWorkLinkHovered(1)
                            }}
                            onHoverEnd={() => {
                                setCursorVariant('default')
                                setWorkLinkHovered(-1)
                            }}
                        >
                            <motion.h1
                                className="flex items-center w-full h-full"
                                whileHover={{ x: -24, opacity: 0.5 }}
                                variants={workLinkVariants}
                                animate={
                                    workLinkHovered == 1 ? 'hovered' : 'default'
                                }
                                transition={{ duration: 0.2 }}
                            >
                                Pepper Wallet
                            </motion.h1>
                        </motion.div>
                        <motion.div
                            className="flex items-center h-48 px-24 border-solid border-b border-gray-400"
                            onHoverStart={() => {
                                setCursorVariant('work')
                                setWorkLinkHovered(2)
                            }}
                            onHoverEnd={() => {
                                setCursorVariant('default')
                                setWorkLinkHovered(-1)
                            }}
                        >
                            <motion.h1
                                className="flex items-center w-full h-full"
                                whileHover={{ x: -24, opacity: 0.5 }}
                                variants={workLinkVariants}
                                animate={
                                    workLinkHovered == 2 ? 'hovered' : 'default'
                                }
                                transition={{ duration: 0.2 }}
                            >
                                Bulletin
                            </motion.h1>
                        </motion.div>
                        <motion.div
                            className="flex items-center h-48 px-24 border-solid border-b border-gray-400"
                            onHoverStart={() => {
                                setCursorVariant('work')
                                setWorkLinkHovered(3)
                            }}
                            onHoverEnd={() => {
                                setCursorVariant('default')
                                setWorkLinkHovered(-1)
                            }}
                        >
                            <motion.h1
                                className="flex items-center w-full h-full"
                                whileHover={{ x: -24, opacity: 0.5 }}
                                variants={workLinkVariants}
                                animate={
                                    workLinkHovered == 3 ? 'hovered' : 'default'
                                }
                                transition={{ duration: 0.2 }}
                            >
                                ReCOVER
                            </motion.h1>
                        </motion.div>
                    </div>
                </section>
            </div>
            <motion.div
                ref={infoRef}
                className="absolute z-10 w-screen"
                style={{ y: infoY }}
            >
                <InfoSection />
            </motion.div>
        </div>
    )
}
