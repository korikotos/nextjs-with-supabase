"use client"

import dynamic from "next/dynamic"

/*
 * Lazily load the heavy WebGL scene on the client only.
 * `ssr: false` is now inside a Client Component, so it’s valid.
 */
const QuantumScene = dynamic(() => import("./quantum-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen text-cyan-400 font-mono">
      Initialising&nbsp;Omnihelix&nbsp;Core…
    </div>
  ),
})

export default function QuantumClient() {
  return <QuantumScene />
}
