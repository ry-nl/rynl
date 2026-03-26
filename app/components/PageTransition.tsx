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

            const clone = cloneRef.current
            const wrapper = wrapperRef.current
            if (!clone || !wrapper) return

            const currentIndex = getPageIndex(pathname)
            const targetIndex = getPageIndex(href)
            const dir = targetIndex > currentIndex ? 'right' : 'left'
            directionRef.current = dir

            const vw = window.innerWidth
            const scrollY = window.scrollY
            const wrapperStartX = dir === 'right' ? vw : -vw

            // 1. Snapshot current page into clone
            clone.innerHTML =
                `<div style="transform:translateY(-${scrollY}px);pointer-events:none">${wrapper.innerHTML}</div>`

            // Replace cloned videos with a frozen frame to prevent reload flash
            const origVideos = wrapper.querySelectorAll('video')
            const clonedVideos = clone.querySelectorAll('video')
            clonedVideos.forEach((clonedVideo, i) => {
                const origVideo = origVideos[i]
                if (origVideo && origVideo.readyState >= 2) {
                    // Capture current frame as canvas → image
                    try {
                        const canvas = document.createElement('canvas')
                        canvas.width = origVideo.videoWidth
                        canvas.height = origVideo.videoHeight
                        const ctx = canvas.getContext('2d')
                        if (ctx) {
                            ctx.drawImage(origVideo, 0, 0)
                            const img = document.createElement('img')
                            img.src = canvas.toDataURL('image/jpeg', 0.8)
                            img.className = clonedVideo.className
                            img.style.cssText = clonedVideo.style.cssText
                            clonedVideo.replaceWith(img)
                            return
                        }
                    } catch { /* fall through to removal */ }
                }
                // Fallback: just remove the video so it doesn't try to load
                clonedVideo.remove()
            })

            // 2. Show clone covering viewport + hide body bg + position wrapper off-screen
            //    All synchronous — happens before React re-renders with new route content
            document.documentElement.style.overflowX = 'hidden'
            document.body.style.background = '#2A2A2A'
            clone.style.transition = 'none'
            clone.style.display = 'block'
            clone.style.transform = 'translateX(0px)'
            wrapper.style.transition = 'none'
            wrapper.style.transform = `translateX(${wrapperStartX}px)`
            wrapper.style.backgroundColor = '#2A2A2A'

            // 3. Navigate — new content renders off-screen in the wrapper
            router.push(href)
            window.scrollTo({ top: 0, behavior: 'instant' })

            // 4. Kick off the slide after new content has had time to render
            setPhase('cloned')
        },
        [phase, pathname, router]
    )

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    // Phase: 'cloned' → elements are already positioned, just start the CSS transition
    // after giving the new page content enough time to render off-screen
    useEffect(() => {
        if (phase !== 'cloned') return

        const clone = cloneRef.current
        const wrapper = wrapperRef.current
        if (!clone || !wrapper) return

        const vw = window.innerWidth
        const dir = directionRef.current
        const cloneExitX = dir === 'right' ? -vw : vw

        // Wait for new page content to mount and paint before sliding
        const startTimer = setTimeout(() => {
            const ease = 'cubic-bezier(0.4, 0, 0.2, 1)'
            clone.style.transition = `transform ${SWIPE_DURATION}ms ${ease}`
            wrapper.style.transition = `transform ${SWIPE_DURATION}ms ${ease}`
            clone.style.transform = `translateX(${cloneExitX}px)`
            wrapper.style.transform = 'translateX(0px)'

            timerRef.current = setTimeout(finishTransition, SWIPE_DURATION + 50)
        }, 80)

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
