"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip auth check for lock page
    if (pathname === "/lock") {
      setIsLoading(false)
      return
    }

    // Check if user has unlocked access
    const unlocked = localStorage.getItem("deepseek_unlocked")

    if (unlocked === "true") {
      setIsUnlocked(true)
    } else {
      router.push("/lock")
    }

    setIsLoading(false)
  }, [pathname, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If on lock page, always show it
  if (pathname === "/lock") {
    return <>{children}</>
  }

  // If not unlocked and not on lock page, don't render anything (redirect will happen)
  if (!isUnlocked) {
    return null
  }

  // If unlocked, show the protected content
  return <>{children}</>
}
