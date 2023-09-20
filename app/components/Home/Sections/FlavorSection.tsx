// 'use client'
// import Image from 'next/image'
// import ParallaxText from '../../ParallaxText'

// import Image1 from '@/public/website1.jpg'
// import Image2 from '@/public/website2.jpg'
// import Image4 from '@/public/website4.jpg'
// import Image5 from '@/public/website5.jpg'

// export default function FlavorSection() {
//     return (
//         <motion.div
//             id="flavor-section-container"
//             ref={flavorRef}
//             className="absolute z-10 w-screen drop-shadow-2xl backdrop-blur-lg shadow-2xl"
//             style={{ y: flavorY }}
//         >
//             <section
//                 className="flex justify-center items-center h-fit w-full bg-dark/30"
//                 onMouseEnter={() => {
//                     setCursorVariant('flavor')
//                 }}
//                 onMouseLeave={() => {
//                     setCursorVariant('default')
//                 }}
//             >
//                 <div
//                     id="content"
//                     className="flex justify-center items-center h-fit py-24 w-full"
//                 >
//                     <div className="relative h-full w-full text-8xl text-white">
//                         <div id="parallax-text" className="w-full font-light">
//                             <ParallaxText baseVelocity={-2}>
//                                 Effective Backend Solutions ·
//                             </ParallaxText>
//                             <ParallaxText baseVelocity={2}>
//                                 Intuitive Frontend Designs ·
//                             </ParallaxText>
//                         </div>
//                         <div
//                             ref={flavorImageRef}
//                             className="flex relative justify-evenly items-center w-screen pt-12"
//                         >
//                             {/* <div className="absolute flex justify-center items-center left-0 h-24 w-12 rounded-r-lg bg-dark opacity-20">
//                                     <h1 className="opacity-100 text-4xl">◀</h1>
//                                 </div>
//                                 <div className="absolute flex justify-center items-center right-0 h-24 w-12 rounded-l-lg bg-dark opacity-20">
//                                     <h1 className="opacity-100 text-4xl">▶</h1>
//                                 </div> */}
//                             <motion.div
//                                 className="flex items-center gap-x-16 p-8 h-fit w-full overflow-x-scroll no-scrollbar"
//                                 // style={{
//                                 //     transform: flavorImagesInView
//                                 //         ? 'none'
//                                 //         : 'translateX(-100px)',
//                                 //     opacity: flavorImagesInView ? 1 : 0,
//                                 //     transition:
//                                 //         'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
//                                 // }}
//                             >
//                                 <Image
//                                     src={Image5}
//                                     alt="Image 5"
//                                     className="h-96 w-fit shadow-lg"
//                                 />
//                                 <Image
//                                     src={Image2}
//                                     alt="Image 2"
//                                     className="h-96 w-fit shadow-lg"
//                                 />
//                                 <Image
//                                     src={Image4}
//                                     alt="Image 4"
//                                     className="h-96 w-fit shadow-lg"
//                                 />
//                                 <Image
//                                     src={Image1}
//                                     alt="Image 1"
//                                     className="h-96 w-fit shadow-lg"
//                                 />
//                             </motion.div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </motion.div>
//     )
// }
// {
//     /* <div
//                             id="flavor-text"
//                             className="flex justify-center items-center h-3/5 px-24 whitespace-normal text-xl text-white font-extralight"
//                         >
//                             <div>
//                                 <div className="w-80 mb-8">
//                                     Hands-on experience creating
//                                     production-level services at both large
//                                     company and startup environments.
//                                 </div>
//                                 <div className="w-80">
//                                     Developing compelling and reliable
//                                     end-to-end solutions with a user-first
//                                     approach. Making products customers love
//                                     using and developers enjoy maintaining.
//                                 </div>
//                             </div>
//                         </div> */
// }

// /* <div className="absolute bottom-0 w-full h-128">
//                             <motion.div
//                                 className="absolute oval bg-dark w-full bottom-0 drop-shadow-3xl -z-10"
//                                 style={{
//                                     height: `${100 - 90 * workScroll}%`,
//                                     transform: 'translate(-50%, 50%)',
//                                 }}
//                             />
//                         </div> */
