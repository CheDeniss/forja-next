'use client'

import { useAuthRefreshTimer } from '@/hooks/useAuthRefreshTimer'
import { useEffect } from 'react'

export default function AuthRefreshClient() {
    useAuthRefreshTimer()

    useEffect(() => {
        console.log('[TEST] useEffect у AuthRefreshClient спрацював')
    }, [])

    return null
}
