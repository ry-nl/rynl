'use client'
import Image from 'next/image'
import ParallaxText from '../../ParallaxText'

import Image1 from '@/public/website1.jpg'
import Image2 from '@/public/website2.jpg'
import Image4 from '@/public/website4.jpg'
import Image5 from '@/public/website5.jpg'

export default function FlavorSection() {
    return (
        <section className="flex justify-center items-center h-fit w-full bg-dark">
            <div
                id="content"
                className="flex justify-center items-center h-fit py-12 w-full"
            >
                <div className="relative h-full w-full text-9xl text-white font-light">
                    <div id="parallax-text" className="w-full font-normal">
                        <ParallaxText baseVelocity={-2}>
                            EFFECTIVE BACKEND SOLUTIONS ·
                        </ParallaxText>
                        <ParallaxText baseVelocity={2}>
                            INTUITIVE FRONTEND DESIGNS ·
                        </ParallaxText>
                    </div>
                    <div className="flex justify-evenly items-center w-screen mt-24 mb-12">
                        <div className="flex gap-x-8 px-8 h-96 w-full overflow-x-scroll no-scrollbar">
                            <Image
                                src={Image5}
                                alt="Image 5"
                                className="h-96 w-fit"
                            />
                            <Image
                                src={Image2}
                                alt="Image 2"
                                className="h-96 w-fit"
                            />
                            <Image
                                src={Image4}
                                alt="Image 4"
                                className="h-96 w-fit"
                            />
                            <Image
                                src={Image1}
                                alt="Image 1"
                                className="h-96 w-fit"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
{
    /* <div
                            id="flavor-text"
                            className="flex justify-center items-center h-3/5 px-24 whitespace-normal text-xl text-white font-extralight"
                        >
                            <div>
                                <div className="w-80 mb-8">
                                    Hands-on experience creating
                                    production-level services at both large
                                    company and startup environments.
                                </div>
                                <div className="w-80">
                                    Developing compelling and reliable
                                    end-to-end solutions with a user-first
                                    approach. Making products customers love
                                    using and developers enjoy maintaining.
                                </div>
                            </div>
                        </div> */
}

/* <div className="absolute bottom-0 w-full h-128">
                            <motion.div
                                className="absolute oval bg-dark w-full bottom-0 drop-shadow-3xl -z-10"
                                style={{
                                    height: `${100 - 90 * workScroll}%`,
                                    transform: 'translate(-50%, 50%)',
                                }}
                            />
                        </div> */
