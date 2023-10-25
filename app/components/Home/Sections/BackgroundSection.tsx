// import Image from 'next/image'
// import { motion } from 'framer-motion'

// import Navbar from '../../Navbar'
// import HeroPic from 'public/hero.jpg'

// const heroText = ['Full-Stack', 'Software', 'Developer']

// export default function BackgroundSection() {
//     return (
//         <section className="h-[105vh] bg-mid">
//             <div id="content" className="relative h-screen py-12">
//                 <div className="flex flex-col justify-between h-full w-1/2 text-8xl font-light">
//                     <Navbar />
//                     <motion.div
//                         initial={{ x: -10, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{
//                             duration: 1,
//                         }}
//                     >
//                         {heroText.map((text) => (
//                             <h1>{text}</h1>
//                         ))}
//                     </motion.div>
//                 </div>
//                 <div className="absolute h-full top-0 right-0 aspect-[3/4]">
//                     <motion.div
//                         className="absolute left-0 bg-light w-full h-full z-10"
//                         initial={{ width: '100%' }}
//                         animate={{ width: '0%' }}
//                         transition={{
//                             duration: 1,
//                             ease: 'easeInOut',
//                         }}
//                     />
//                     <Image
//                         src={HeroPic}
//                         alt="Ryan Lee"
//                         className="absolute right-0 h-full w-full py-12 object-cover z-0"
//                     />
//                 </div>
//             </div>
//         </section>
//     )
// }
