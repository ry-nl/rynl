'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ROUTES = ['/', '/work', '/about', '/contact']

/**
 * Eagerly prefetches all app routes on mount so that
 * page transitions feel instant after initial load.
 */
export default function RoutePrefetcher() {
    const router = useRouter()

    useEffect(() => {
        // Prefetch after a short delay so we don't compete with initial hydration
        const timer = setTimeout(() => {
            ROUTES.forEach((route) => router.prefetch(route))
        }, 1500)
        return () => clearTimeout(timer)
    }, [router])

    return null
}
