import { StaticImageData } from 'next/image'

import AWSImage from '@/public/aws2.png'
import PolarityLogo from '@/public/polarityLogo.jpg'
import KiteLogo from '@/public/kiteLogo2.jpg'

interface experienceItem {
    company: string
    position: string
    dates: string
    image: StaticImageData
}

export const ExperienceData: experienceItem[] = [
    {
        company: 'Amazon Web Services',
        position: 'Software Development Engineer',
        dates: 'Oct 2023 - Present',
        image: AWSImage,
    },
    {
        company: 'Amazon Web Services',
        position: 'Intern Software Development Engineer',
        dates: 'May 2023 - Aug 2023',
        image: AWSImage,
    },
    {
        company: 'Layr/Polarity',
        position: 'Full-Stack Software Developer',
        dates: 'July 2022 - Feb 2023',
        image: PolarityLogo,
    },
    {
        company: 'Kite',
        position: 'Intern Software Engineer',
        dates: 'Jun 2021 - Aug 2021',
        image: KiteLogo,
    },
]

// interface projectItem {
//     name: string
//     company: string
//     position: string
//     tools: string[]
//     description: string
//     accomplishments: string[]
//     image: StaticImageData
//     scale: number
// }

// export const ProjectData: projectItem[] = [
//     {
//         name: 'Warden',
//         company: 'Amazon Web Services',
//         position: 'Backend Developer',
//         tools: ['Go', 'Python', 'AWS'],
//         description:
//             'Warden is a daemon process that monitors the health and security of AWS servers, designed to collect vital hardware data and notifying downstream consumers of any failures. Warden is currently deployed on the AWS EC2 fabric for Amazon Linux 2 and up.',
//         accomplishments: [
//             'Support for periodic and on-demand data collection',
//             'Service to be installed on over two-thirds of all AWS hosts',
//             'Devised method to remove all runtime dependencies and deploy service as a standalone binary, eliminating OS and architecture-related versioning issues',
//             'Initiated design decision to convert data collection subprocesses to threads, reducing memory footprint by 60% and increasing average execution speed by up to 200%',
//             'Executed migration to new credential management service for authenticating access to AWS resources',
//         ],
//         image: AWSImage,
//     },
//     {
//         name: 'Layr',
//         company: 'Pepper Labs',
//         position: 'Backend Developer',
//         tools: ['TypeScript', 'React Native', 'GraphQL', 'Apollo', 'MongoDB'],
//         description:
//             'Layr is an iOS and Android application that allows users to easily and securely trade and manage their cryptocurrency assets.',
//         accomplishments: [
//             'Direct exchange between defi assets without need for an intermediary stablecoin',
//             'Led backend architecture and development, successfully launched MVP 3 months ahead of schedule',
//             'Spearheaded integration of Redux to eliminate redundant API requests, reducing application latency by over 60%',
//             'Developed routing algorithm to generate and execute token swap routes that minimized transfer fees',
//             'Addressed user privacy issue by engineering method to consistently generate wallet access key without storage of user credentials',
//         ],
//         image: PolarityLogo,
//     },
//     {
//         name: 'ReCOVER',
//         company: 'University of Southern California',
//         position: 'Full Stack Developer',
//         tools: ['NextJS', 'ChartJS'],
//         description:
//             'ReCOVER is a web application built for the USC Keck School of Medicine Infectious Disease Department. ReCOVER enables researchers to easily visualize and add new disease forecast data from a single metadata repository.',
//         accomplishments: [
//             'Support for multiple simultaneous data sources and chart types',
//             'Custom metadata language to allow for easy addition of new data sources without the need for code changes',
//             'Managed team of 6 developers and supervised team progress based on stakeholder needs to generate mockups and user stories',
//             'Scheduled deliverable timeline and handled communications across multiple stakeholders',
//         ],
//         image: RecoverImage,
//     },
// {
//     name: 'Covider',
//     company: 'University of Southern California',
//     position: 'Full Stack Developer',
//     tools: ['Java', 'Android Studio', 'Python', 'Django', 'Firebase'],
//     description:
//         'Covider is an Android application to measure and display Covid risk levels associated with each campus building. The application provides an interface for students and faculty to report Covid symptoms and test results, and allows instructors to notify students of potential exposure or send class cancellations.',
//     accomplishments: [
//         'Map view of campus buildings with color-coded risk levels using Google Maps API',
//         'Custom algorithm to calculate risk level based on user-reported symptoms and test results',
//         'Server-side event loop to send live notifications to users based on location',
//         'Test-driven development with extensive black and white box test suites',
//         'Guided team through agile development cycle and introduced code-review practices',
//     ],
//     image:
// },
// ]
