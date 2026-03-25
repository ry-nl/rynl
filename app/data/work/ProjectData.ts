export interface ExperienceItem {
    company: string
    role: string
    dates: string
    technologies: string[]
    accomplishments: string[]
}

export const ExperienceData: ExperienceItem[] = [
    {
        company: 'Salesforce',
        role: 'Software Engineer II (MTS)',
        dates: 'Mar 2025 — Present',
        technologies: ['Java', 'Python', 'AWS', 'Kubernetes'],
        accomplishments: [
            'Re-engineered priority-based autoscaling system to scale WhatsApp channel from 15M to 300M monthly messages',
            'Designed reusable multi-stage deduplication framework, reducing on-call pages by 28% and third-party API consumption by 11%',
            'Launched typing indicators and read receipts features, improving user retention by 39%',
            'Led cross-team initiative to integrate Meta templates into Salesforce platform, driving acquisition of 2 new enterprise customers',
        ],
    },
    {
        company: 'Amazon Web Services',
        role: 'Software Development Engineer I',
        dates: 'Oct 2023 — Mar 2025',
        technologies: ['Go', 'Python', 'Ruby', 'Perl', 'Lua', 'AWS'],
        accomplishments: [
            'Took ownership of critical monitoring services delivering real-time fleet data to 100+ AWS teams at 99.8% parity',
            'Designed and launched service to collect and aggregate 200TB of hourly telemetry consumed by EC2, EBS, and S3',
            'Developed algorithm to mitigate excessive polling and false positive alarming, decreasing on-call tickets by 12% and saving $30K/month',
            'Coordinated expansion of monitoring for 45 new platforms to be launched across AWS',
        ],
    },
    {
        company: 'Amazon Web Services',
        role: 'Software Development Engineer Intern',
        dates: 'May 2023 — Aug 2023',
        technologies: ['Go', 'Python', 'AWS'],
        accomplishments: [
            'Spearheaded development of reworked daemon service to detect and process failures within the AWS fleet',
            'Converted daemon sub-processes to threads, improving memory and compute efficiency by 80% during high traffic',
            'Devised method to deploy service as a platform-agnostic binary, eliminating version compatibility issues',
        ],
    },
    {
        company: 'Polarity',
        role: 'Back-End Software Development Engineer',
        dates: 'Jul 2022 — Feb 2023',
        technologies: ['TypeScript', 'Swift', 'React Native', 'GraphQL', 'Apollo', 'MongoDB'],
        accomplishments: [
            'Led back-end architecture and development of mobile cryptocurrency trading platform, launching MVP 3 months ahead of schedule',
            'Drove integration of Redux-based caching to eliminate redundant API requests, halving application latency',
            'Developed routing algorithm to generate and execute token swap routes, reducing user transfer fees by up to 65%',
            'Engineered method to generate wallet access key without storage of credentials, addressing user privacy concerns',
        ],
    },
]

export const EducationData = {
    school: 'University of Southern California',
    degree: 'B.S. Computer Science',
    dates: 'Aug 2020 — May 2023',
    honors: 'Viterbi Dean\'s List',
}

export const SkillsData = {
    languages: ['Python', 'Java', 'TypeScript', 'Go', 'Rust', 'Lua', 'Swift', 'SQL', 'NoSQL', 'GraphQL', 'HTML', 'CSS'],
    skills: ['REST API', 'Infrastructure', 'Systems Design', 'Cloud Computing', 'Data Analysis', 'Algorithms'],
    backEnd: ['AWS', 'Spring', 'MongoDB', 'Apollo', 'Express', 'Node', 'MySQL', 'Postgres'],
    frontEnd: ['React', 'React Native', 'Redux', 'Next', 'Sass', 'Tailwind'],
    other: ['Git', 'Postman', 'Docker', 'Kubernetes', 'Jupyter', 'Figma', 'CI/CD'],
}
