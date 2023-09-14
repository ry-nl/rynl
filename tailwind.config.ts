import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                dark: '#2A2A2A',
                mid: '#4A4A4A',
                light: '#EEEEEE',
            },
            width: {
                '128': '32rem',
            },
            height: {
                '128': '32rem',
                section: '140vh',
            },
            fontSize: {
                '10xl': '10rem',
            },
        },
    },
    plugins: [],
}
export default config
