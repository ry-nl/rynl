// import { motion } from 'framer-motion'
// import { useState } from 'react'

// export function ExperienceRow({
//     companyName,
//     link,
//     image,
// }: {
//     companyName: string
//     link: string
//     image: Image
// }) {
//     const [workLinkHovered, setWorkLinkHovered] = useState(-1)

//     const workLinkVariants = {
//         default: {
//             opacity: 1,
//         },
//         hovered: {
//             opacity: 0.5,
//         },
//     }

//     const workModalVariants = {
//         visible: {
//             width: '700px',
//             height: '250px',
//             opacity: 1,
//         },
//         hidden: {
//             width: '350px',
//             height: '125px',
//             opacity: 0,
//         },
//     }
//     return (
//         <motion.div
//             className="relative flex items-center h-fit w-full px-24 py-4 border-solid border-y border-black/30"
//             onMouseEnter={() => {
//                 setWorkLinkHovered(0)
//             }}
//             onMouseLeave={() => {
//                 setWorkLinkHovered(-1)
//             }}
//         >
//             <motion.h1
//                 className="flex justify-between items-center w-full h-full"
//                 variants={workLinkVariants}
//                 animate={workLinkHovered == 0 ? 'hovered' : 'default'}
//             >
//                 AMAZON WEB SERVICES
//             </motion.h1>
//             <motion.div
//                 className="relative flex justify-center items-center rounded-sm bg-[#d1cac5] drop-shadow-2xl z-10"
//                 variants={workModalVariants}
//                 animate={workLinkHovered == 0 ? 'visible' : 'hidden'}
//                 onMouseEnter={() => {
//                     setCursorVariant('link')
//                 }}
//                 onMouseLeave={() => {
//                     setCursorVariant('defaultDark')
//                 }}
//             >
//                 <motion.div
//                     className="absolute flex justify-center items-center opacity-0 inset-0 text-white text-2xl font-thin bg-black/60"
//                     whileHover={{
//                         opacity: 1,
//                         backdropFilter: 'blur(1px)',
//                         transition: { duration: 0.2 },
//                     }}
//                 >
//                     <h1 className="p-2 bg-dark rounded-xl">Visit Repo</h1>
//                 </motion.div>
//                 <Image
//                     src={awsImage}
//                     alt="aws image"
//                     className="w-full px-6 object-cover"
//                 />
//             </motion.div>
//         </motion.div>
//     )
// }
