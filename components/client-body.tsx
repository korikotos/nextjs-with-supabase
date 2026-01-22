"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"

export default function ClientBody({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 1. Service-workers supported?
    if (!("serviceWorker" in navigator)) return

    // 2. Skip the v0 preview host ( *.lite.vusercontent.net )
    //    That environment injects its own SW which conflicts with any extra one.
    const isV0Preview = location.hostname.includes(".lite.vusercontent.net")
    if (isV0Preview) {
      console.info("[SW] v0 preview detected – skipping custom /sw.js registration to avoid AbortError.")
      return
    }

    // 3. Only register in production (you can keep it in dev if you want)
    if (process.env.NODE_ENV !== "production") {
      console.info("[SW] Development mode – skipping /sw.js registration.")
      return
    }

    // 4. If another SW already controls the page, respect it.
    if (navigator.serviceWorker.controller) {
      console.info("[SW] Existing controller found – no additional registration needed.")
      return
    }

    // 5. Register our own service worker for offline support
    const register = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("[SW] /sw.js registered:", reg.scope))
        .catch((err) => console.warn("[SW] /sw.js failed:", err))
    }

    window.addEventListener("load", register)
    return () => window.removeEventListener("load", register)
  }, [])

  return <>{children}</>
}
