// import React, { useState, useRef } from 'react'
// import { motion, useMotionValue, AnimatePresence } from 'framer-motion'
// import Image from 'next/image'

// import Image1 from '@/public/website1.jpg'
// import Image2 from '@/public/website2.jpg'
// import Image4 from '@/public/website4.jpg'
// import Image5 from '@/public/website5.jpg'

// const images = [Image1, Image2, Image4, Image5]

// interface modalProps {
//     variant: number
// }

// // const Modal: React.FC<modalProps> = ({ variant }) => {
// //     return (
// //         <motion.div
// //             className="absolute left-[50vw] bg-dark p-2"
// //             initial={{
// //                 opacity: 0,
// //                 width: '0rem',
// //                 height: '0rem',
// //             }}
// //             animate={{
// //                 opacity: 1,
// //                 width: '32rem',
// //                 height: '24rem',
// //             }}
// //             exit={{
// //                 opacity: 0,
// //                 width: '0rem',
// //                 height: '0rem',
// //             }}
// //             transition={{ delay: 0.2, duration: 0.2 }}
// //         >
// //             <Image src={images[variant]} alt="Image" className="h-fit w-full" />
// //         </motion.div>
// //     )
// // }

// export default function WorkSection() {
//     const [modalVariant, setModalVariant] = useState(0)

//     return (
//         <div id="work-section-container" className="relative z-0">
//             <section className="relative flex items-center h-section pt-24">
//                 <div
//                     id="content"
//                     className="h-screen w-full text-7xl font-light px-24"
//                 >
//                     <h1 className="text-base pl-8">recent work</h1>
//                     <motion.div
//                         className="relative flex items-center h-48 w-full px-24 border-solid border-y border-gray-400"
//                         onHoverStart={() => {
//                             setCursorVariant('work')
//                             setWorkLinkHovered(0)
//                             setCursorContent('warden')
//                         }}
//                         onHoverEnd={() => {
//                             setCursorVariant('default')
//                             setWorkLinkHovered(-1)
//                             setCursorContent('')
//                         }}
//                     >
//                         <motion.h1
//                             className="flex items-center w-full h-full"
//                             variants={workLinkVariants}
//                             animate={
//                                 workLinkHovered == 0 ? 'hovered' : 'default'
//                             }
//                             transition={{ duration: 0.2 }}
//                         >
//                             Warden
//                         </motion.h1>
//                     </motion.div>
//                     <motion.div
//                         className="flex items-center h-48 px-24 border-solid border-b border-gray-400"
//                         onHoverStart={() => {
//                             setCursorVariant('work')
//                             setWorkLinkHovered(1)
//                         }}
//                         onHoverEnd={() => {
//                             setCursorVariant('default')
//                             setWorkLinkHovered(-1)
//                         }}
//                     >
//                         <motion.h1
//                             className="flex items-center w-full h-full"
//                             whileHover={{ x: -24, opacity: 0.5 }}
//                             variants={workLinkVariants}
//                             animate={
//                                 workLinkHovered == 1 ? 'hovered' : 'default'
//                             }
//                             transition={{ duration: 0.2 }}
//                         >
//                             Pepper Wallet
//                         </motion.h1>
//                     </motion.div>
//                     <motion.div
//                         className="flex items-center h-48 px-24 border-solid border-b border-gray-400"
//                         onHoverStart={() => {
//                             setCursorVariant('work')
//                             setWorkLinkHovered(2)
//                         }}
//                         onHoverEnd={() => {
//                             setCursorVariant('default')
//                             setWorkLinkHovered(-1)
//                         }}
//                     >
//                         <motion.h1
//                             className="flex items-center w-full h-full"
//                             whileHover={{ x: -24, opacity: 0.5 }}
//                             variants={workLinkVariants}
//                             animate={
//                                 workLinkHovered == 2 ? 'hovered' : 'default'
//                             }
//                             transition={{ duration: 0.2 }}
//                         >
//                             Bulletin
//                         </motion.h1>
//                     </motion.div>
//                     <motion.div
//                         className="flex items-center h-48 px-24 border-solid border-b border-gray-400"
//                         onHoverStart={() => {
//                             setCursorVariant('work')
//                             setWorkLinkHovered(3)
//                         }}
//                         onHoverEnd={() => {
//                             setCursorVariant('default')
//                             setWorkLinkHovered(-1)
//                         }}
//                     >
//                         <motion.h1
//                             className="flex items-center w-full h-full"
//                             whileHover={{ x: -24, opacity: 0.5 }}
//                             variants={workLinkVariants}
//                             animate={
//                                 workLinkHovered == 3 ? 'hovered' : 'default'
//                             }
//                             transition={{ duration: 0.2 }}
//                         >
//                             ReCOVER
//                         </motion.h1>
//                     </motion.div>
//                 </div>
//             </section>
//         </div>
//     )
// }
