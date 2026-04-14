"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function VideoShowcase() {
  const [isInView, setIsInView] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      {
        threshold: 0.3, // Reduced threshold for better triggering
        rootMargin: "0px 0px -100px 0px", // Trigger earlier
      },
    )

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      observer.disconnect()
    }
  }, [])

  const downloadVideo = () => {
    window.open("https://www.youtube.com/watch?v=LQC9Gru9948", "_blank")
  }

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Witness the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Ineffable
            </span>{" "}
            in Motion
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the transcendent power of our AI-driven creative platform through this immersive showcase
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm">
            {/* Replace the video element section with YouTube embed */}
            <div className="relative group">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/LQC9Gru9948?autoplay=0&mute=1&loop=1&playlist=LQC9Gru9948&controls=1&modestbranding=1&rel=0"
                  title="The Ineffable - Planet 1"
                  className="w-full h-full rounded-lg border-2 border-gray-600 shadow-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"></div>
            </div>

            {/* Gradient Borders */}
            <div
              className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "xor" }}
            />
          </div>

          {/* Video Description */}
          <div className="mt-8 text-center">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">AI</span>
                </div>
                <h3 className="text-white font-semibold mb-2">AI-Powered Creation</h3>
                <p className="text-gray-300 text-sm">Watch as artificial intelligence transforms ideas into reality</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">∞</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Infinite Possibilities</h3>
                <p className="text-gray-300 text-sm">Explore limitless creative potential across all mediums</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Instant Generation</h3>
                <p className="text-gray-300 text-sm">Create stunning visuals and code in seconds, not hours</p>
              </div>
            </div>

            <div className="mt-8">
              <Button
                onClick={() => (window.location.href = "/generator/videos")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
              >
                Create Your Own Video
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
