'use client'
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useRef,
    useEffect,
    ReactNode,
} from 'react'
import { useRouter, usePathname } from 'next/navigation'
import NavSidebar from './NavSidebar'

type TransitionPhase = 'idle' | 'cloned' | 'sliding'

interface TransitionContextType {
    navigateTo: (href: string) => void
    scrollToTop: () => void
    navModalOpen: boolean
    setNavModalOpen: (open: boolean) => void
}

const TransitionContext = createContext<TransitionContextType>({
    navigateTo: () => {},
    scrollToTop: () => {},
    navModalOpen: false,
    setNavModalOpen: () => {},
})

export function usePageTransition() {
    return useContext(TransitionContext)
}

// Page order for determining swipe direction
const PAGE_ORDER = ['/', '/work', '/about', '/contact']

function getPageIndex(path: string): number {
    const idx = PAGE_ORDER.indexOf(path)
    return idx === -1 ? 0 : idx
}

const SWIPE_DURATION = 550

export function TransitionProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [phase, setPhase] = useState<TransitionPhase>('idle')
    const [navModalOpen, setNavModalOpen] = useState(false)
    const directionRef = useRef<'left' | 'right'>('right')
    const wrapperRef = useRef<HTMLDivElement>(null)
    const cloneRef = useRef<HTMLDivElement>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const finishTransition = useCallback(() => {
        const clone = cloneRef.current
        const wrapper = wrapperRef.current

        if (wrapper) {
            wrapper.style.transition = ''
            wrapper.style.transform = ''
            wrapper.style.backgroundColor = ''
        }
        if (clone) {
            clone.style.transition = ''
            clone.style.transform = ''
            clone.style.display = 'none'
            clone.innerHTML = ''
        }
        document.documentElement.style.overflowX = ''
        document.body.style.background = ''
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
        setPhase('idle')
    }, [])

    const navigateTo = useCallback(
        (href: string) => {
            if (phase !== 'idle') return
            setNavModalOpen(false)

            const currentIndex = getPageIndex(pathname)
            const targetIndex = getPageIndex(href)
            directionRef.current = targetIndex > currentIndex ? 'right' : 'left'

            // Snapshot the current page into the clone
            if (wrapperRef.current && cloneRef.current) {
                const scrollY = window.scrollY
                cloneRef.current.innerHTML =
                    `<div style="transform:translateY(-${scrollY}px);pointer-events:none">${wrapperRef.current.innerHTML}</div>`
            }

            // Navigate immediately
            router.push(href)
            window.scrollTo({ top: 0, behavior: 'instant' })

            // Move to the 'cloned' phase — the effect below will position elements
            // and then kick off the CSS transition in a rAF
            setPhase('cloned')
        },
        [phase, pathname, router]
    )

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    // Phase: 'cloned' → position elements off-screen, then trigger CSS transitions
    useEffect(() => {
        if (phase !== 'cloned') return

        const clone = cloneRef.current
        const wrapper = wrapperRef.current
        if (!clone || !wrapper) return

        const vw = window.innerWidth
        const dir = directionRef.current

        // Prevent horizontal scroll and hide body's light background
        document.documentElement.style.overflowX = 'hidden'
        document.body.style.background = '#2A2A2A'

        const cloneExitX = dir === 'right' ? -vw : vw
        const wrapperStartX = dir === 'right' ? vw : -vw

        // Position elements instantly (no transition yet)
        clone.style.transition = 'none'
        wrapper.style.transition = 'none'
        clone.style.display = 'block'
        clone.style.transform = 'translateX(0px)'
        wrapper.style.transform = `translateX(${wrapperStartX}px)`
        // Give wrapper a solid background so un-rendered content doesn't flash white
        wrapper.style.backgroundColor = '#2A2A2A'

        // Force reflow so the browser registers the starting positions
        void wrapper.offsetHeight
        void clone.offsetHeight

        // Apply CSS transitions and set end positions after a micro-delay
        // (setTimeout instead of rAF to ensure it fires even if tab is not visible)
        const startTimer = setTimeout(() => {
            const ease = 'cubic-bezier(0.4, 0, 0.2, 1)'
            clone.style.transition = `transform ${SWIPE_DURATION}ms ${ease}`
            wrapper.style.transition = `transform ${SWIPE_DURATION}ms ${ease}`
            clone.style.transform = `translateX(${cloneExitX}px)`
            wrapper.style.transform = 'translateX(0px)'

            // Clean up after the transition finishes
            timerRef.current = setTimeout(finishTransition, SWIPE_DURATION + 50)
        }, 20)

        // If this effect re-runs (strict mode), clean up
        return () => {
            clearTimeout(startTimer)
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = null
            }
        }
    }, [phase, finishTransition])

    return (
        <TransitionContext.Provider value={{ navigateTo, scrollToTop, navModalOpen, setNavModalOpen }}>
            {/* Clone of previous page — visible only during transition */}
            <div
                ref={cloneRef}
                aria-hidden
                className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none"
                style={{ display: 'none', zIndex: 45, willChange: 'transform' }}
            />
            {/* Actual page content */}
            <div ref={wrapperRef} style={{ willChange: phase !== 'idle' ? 'transform' : 'auto' }}>
                {children}
            </div>
            {/* NavSidebar outside animated wrapper so it stays fixed */}
            <NavSidebar />
        </TransitionContext.Provider>
    )
}

/**
 * A link component that triggers the page transition
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
