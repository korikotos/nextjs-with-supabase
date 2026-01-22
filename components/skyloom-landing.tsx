"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LucideBrain,
  LucideZap,
  LucideGlobe,
  LucideRocket,
  LucideShield,
  LucideCrown,
  CloudLightningIcon as LucideOrb,
  LucideSparkles,
} from "lucide-react"

interface QuantumParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export default function SkyloomLanding() {
  const [particles, setParticles] = useState<QuantumParticle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Initialize quantum particles
  useEffect(() => {
    const newParticles: QuantumParticle[] = []
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }
    setParticles(newParticles)

    // Animate particles
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight,
        })),
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  // Track mouse for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const QuantumBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Quantum Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(0,255,255,0.5)`,
            }}
          />
        ))}

        {/* Mouse Glow Effect */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 70%)",
          }}
        />
      </div>
    )
  }

  const roadmapItems = [
    {
      icon: <LucideBrain className="h-5 w-5" />,
      title: "The Skyloom Oracle",
      desc: "Conversational AI that understands quantum reality",
    },
    {
      icon: <LucideOrb className="h-5 w-5" />,
      title: "Tech Orb Interface",
      desc: "The Agent Nexus - your command center",
    },
    {
      icon: <LucideGlobe className="h-5 w-5" />,
      title: "Floating Navigation",
      desc: "Quantum scroll tracking & spatial UI",
    },
    { icon: <LucideCrown className="h-5 w-5" />, title: "Meet the Visionaries", desc: "Mneimne & AI collaboration" },
    {
      icon: <LucideShield className="h-5 w-5" />,
      title: "AI Agents Deploy",
      desc: "Your deployed intelligence network",
    },
    { icon: <LucideZap className="h-5 w-5" />, title: "Quantum Seed to AI Bloom", desc: "How the magic happens" },
    { icon: <LucideRocket className="h-5 w-5" />, title: "Launch Your AI", desc: "Pricing & enterprise solutions" },
    {
      icon: <LucideSparkles className="h-5 w-5" />,
      title: "Echoes of Innovation",
      desc: "Testimonials from the future",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] font-sans overflow-x-hidden relative">
      <QuantumBackground />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center p-4 md:p-8">
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Status Badges */}
          <div className="flex justify-center gap-2 mb-8 animate-fadeInUp">
            <Badge variant="outline" className="quantum-border bg-black/50 backdrop-blur">
              <LucideZap className="mr-1 h-3 w-3 text-cyan-400" />
              Quantum Active
            </Badge>
            <Badge variant="outline" className="quantum-border bg-black/50 backdrop-blur">
              <LucideBrain className="mr-1 h-3 w-3 text-cyan-400" />
              AI Powered
            </Badge>
            <Badge variant="outline" className="quantum-border bg-black/50 backdrop-blur">
              <LucideGlobe className="mr-1 h-3 w-3 text-cyan-400" />
              Global Network
            </Badge>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 animate-fadeInUp leading-tight"
            style={{
              animationDelay: "0.2s",
              textShadow: "0 0 30px rgba(0,255,255,0.5), 0 0 60px rgba(0,255,255,0.3)",
            }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              SKYLOOM
            </span>
            <br />
            <span className="text-white">Weave the Future.</span>
            <br />
            <span className="text-cyan-400">Unleash Quantum AI.</span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-[#F0F0F0] mb-10 max-w-4xl mx-auto animate-fadeInUp leading-relaxed"
            style={{ animationDelay: "0.7s" }}
          >
            An immersive, interactive digital embassy, heralding a new era of intelligent technology. Where quantum
            computing meets artificial intelligence to create the impossible.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp"
            style={{ animationDelay: "1.2s" }}
          >
            <Button
              size="lg"
              className="bg-[#101010] text-cyan-400 px-8 py-4 text-lg font-semibold
                         shadow-[4px_4px_8px_#050505,_-4px_-4px_8px_#151515]
                         hover:shadow-[4px_4px_8px_#050505,_-4px_-4px_8px_#151515,_0_0_15px_rgba(0,255,255,0.5),_0_0_25px_rgba(0,255,255,0.3)]
                         hover:translate-y-[-2px] transition-all duration-300"
            >
              <LucideRocket className="mr-2 h-5 w-5" />
              Explore Skyloom
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-cyan-400 text-cyan-400 px-8 py-4 text-lg font-semibold
                         hover:bg-cyan-400 hover:text-black transition-all duration-300"
            >
              <LucideBrain className="mr-2 h-5 w-5" />
              Launch AI Agent
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Roadmap Section */}
      <section className="relative w-full max-w-7xl mx-auto p-8 my-16">
        <Card className="bg-[#101010]/80 backdrop-blur border-cyan-400/20 shadow-[5px_5px_10px_#050505,_-5px_-5px_10px_#151515]">
          <CardContent className="p-8">
            <h2 className="text-3xl md:text-4xl text-cyan-400 mb-8 text-center font-bold">
              🚀 Roadmap to Skyloom Portal
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmapItems.map((item, index) => (
                <Card
                  key={index}
                  className="bg-black/40 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-cyan-400">{item.icon}</div>
                      <h3 className="text-cyan-400 font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Billion Dollar Vision */}
            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-cyan-400/40">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">💰 The Billion Dollar Vision</h3>
                  <p className="text-gray-300 mb-4">
                    SKYLOOM isn't just a platform - it's the foundation of a quantum AI empire. Enterprise solutions,
                    API monetization, and revolutionary technology.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      Enterprise Ready
                    </Badge>
                    <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                      Scalable Architecture
                    </Badge>
                    <Badge variant="outline" className="border-purple-400 text-purple-400">
                      Patent Pending
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative w-full p-8 border-t border-cyan-400/20 bg-black/50 backdrop-blur">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center gap-2 mb-4">
            <Badge variant="outline" className="border-cyan-400 text-cyan-400">
              <LucideShield className="mr-1 h-3 w-3" />
              Quantum Secured
            </Badge>
            <Badge variant="outline" className="border-cyan-400 text-cyan-400">
              <LucideCrown className="mr-1 h-3 w-3" />
              SQYLOOM Empire
            </Badge>
          </div>
          <div className="text-sm text-gray-400 space-y-1">
            <p className="text-cyan-400 font-semibold">SKYLOOM - Quantum AI Platform v2.0</p>
            <p>© 2024 Quick Jet Services by hichammneimne.com</p>
            <p>www.sqyloom.uk | Architects Vercel</p>
            <p className="text-xs opacity-75">Building the future, one quantum at a time ✨</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Open+Sans:wght@400;600&display=swap');
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .quantum-border {
          border: 1px solid rgba(0, 255, 255, 0.3);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}
