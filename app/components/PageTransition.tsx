'use client'
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useRef,
    ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

type TransitionPhase = 'idle' | 'covering' | 'revealing'

interface TransitionContextType {
    navigateTo: (href: string) => void
    scrollToTop: () => void
}

const TransitionContext = createContext<TransitionContextType>({
    navigateTo: () => {},
    scrollToTop: () => {},
})

export function usePageTransition() {
    return useContext(TransitionContext)
}

const CURTAIN_DURATION = 0.5
const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

export function TransitionProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [phase, setPhase] = useState<TransitionPhase>('idle')
    const targetHref = useRef<string | null>(null)

    const navigateTo = useCallback(
        (href: string) => {
            if (phase !== 'idle') return
            targetHref.current = href
            setPhase('covering')
        },
        [phase]
    )

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const handleAnimationComplete = useCallback(() => {
        if (phase === 'covering') {
            // Curtain is fully covering the screen — navigate now
            if (targetHref.current) {
                router.push(targetHref.current)
                window.scrollTo({ top: 0, behavior: 'instant' })
                targetHref.current = null
            }
            // Brief delay for the new page to mount, then reveal
            setTimeout(() => setPhase('revealing'), 150)
        } else if (phase === 'revealing') {
            setPhase('idle')
        }
    }, [phase, router])

    // Determine curtain y position based on phase
    const curtainY =
        phase === 'idle'
            ? '100%' // off-screen below
            : phase === 'covering'
              ? '0%' // slide up to cover
              : '-100%' // slide up to reveal

    return (
        <TransitionContext.Provider value={{ navigateTo, scrollToTop }}>
            {children}
            <motion.div
                className="fixed inset-0 bg-dark z-[100] pointer-events-none"
                initial={false}
                animate={{ y: curtainY }}
                transition={{
                    duration: phase === 'idle' ? 0 : CURTAIN_DURATION,
                    ease: CURTAIN_EASE,
                }}
                onAnimationComplete={handleAnimationComplete}
            />
        </TransitionContext.Provider>
    )
}

/**
 * A link component that triggers the page transition curtain
 * before navigating. Use for internal routes only.
 */
export function TransitionLink({
    href,
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    ...props
}: {
    href: string
    children: ReactNode
    className?: string
    onMouseEnter?: () => void
    onMouseLeave?: () => void
} & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'onClick'
>) {
    const { navigateTo } = usePageTransition()

    return (
        <a
            href={href}
            className={className}
            onClick={(e) => {
                e.preventDefault()
                navigateTo(href)
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...props}
        >
            {children}
        </a>
    )
}
