// import Image from 'next/image'
// import { motion } from 'framer-motion'

// import Navbar from '../../Navbar'
// import HeroPic from 'public/hero.jpg'

// export default function HeroSection() {
//     return (
//         <section className="h-[110vh] px-24">
//             <div id="content" className="relative h-screen py-10">
//                 <Navbar />
//                 <motion.div
//                     className="flex flex-col justify-end h-full w-1/2 font-light leading-tight"
//                     initial={{ x: -10, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{
//                         duration: 1,
//                     }}
//                 >
//                     <h1 className="text-3xl mb-4">ryan lee ©</h1>

//                     <h1 className="text-8xl">Full-Stack Software Developer</h1>
//                 </motion.div>
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
