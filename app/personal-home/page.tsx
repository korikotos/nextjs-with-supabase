"use client"

import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideHeart, LucideCode, LucideRocket, LucideStar } from "lucide-react"
import { SQYLOOMLoginForm, SQYLOOMAuthProvider, useSQYLOOMAuth } from "@/components/sqyloom-auth"
import QuantumTerminal from "@/components/quantum-terminal"

function PersonalHomeContent() {
  const { isAuthenticated } = useSQYLOOMAuth()

  if (isAuthenticated) {
    return <QuantumTerminal />
  }

  return (
    <div className="min-h-screen bg-background grid-pattern p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Personal Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <LucideHeart className="h-8 w-8 text-primary quantum-glow" />
            <h1 className="text-4xl font-bold quantum-text">SQYLOOM.me</h1>
          </div>
          <p className="text-xl text-muted-foreground">Personal Projects & Creative Experiments</p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="outline" className="quantum-border">
              <LucideCode className="mr-1 h-3 w-3" />
              Developer
            </Badge>
            <Badge variant="outline" className="quantum-border">
              <LucideRocket className="mr-1 h-3 w-3" />
              Innovator
            </Badge>
            <Badge variant="outline" className="quantum-border">
              <LucideStar className="mr-1 h-3 w-3" />
              Dreamer
            </Badge>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Personal Projects */}
          <div className="space-y-6">
            <Card className="quantum-border hologram">
              <CardHeader>
                <CardTitle className="quantum-text">Creative Playground</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded quantum-border">
                    <h3 className="font-semibold">Quantum Experiments</h3>
                    <p className="text-sm text-muted-foreground">
                      Playing with quantum computing concepts and visualizations
                    </p>
                  </div>

                  <div className="p-3 rounded quantum-border">
                    <h3 className="font-semibold">AI Art Generator</h3>
                    <p className="text-sm text-muted-foreground">
                      Creating beautiful art using artificial intelligence
                    </p>
                  </div>

                  <div className="p-3 rounded quantum-border">
                    <h3 className="font-semibold">Code Poetry</h3>
                    <p className="text-sm text-muted-foreground">Where programming meets artistic expression</p>
                  </div>
                </div>

                <Button className="w-full quantum-glow">Explore My Projects</Button>
              </CardContent>
            </Card>

            <Card className="quantum-border">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">About This Space</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Welcome to my personal corner of the SQYLOOM universe! 🌟</p>
                  <p>This is where I experiment, create, and share my journey in quantum computing and AI.</p>
                  <p>Every project here is a step towards making the impossible possible.</p>
                  <p className="quantum-text">Dream big, code bigger! 💫</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Login Form */}
          <div>
            <SQYLOOMLoginForm />
          </div>
        </div>

        {/* Personal Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <div className="space-y-2">
            <p>Made with ❤️ and quantum magic</p>
            <p>© 2024 Personal Projects by SQYLOOM</p>
            <p className="quantum-text">Building the future, one dream at a time ✨</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

const DynamicPersonalHome = dynamic(
  () => Promise.resolve(function WrappedPersonalHome() {
    return (
      <SQYLOOMAuthProvider>
        <PersonalHomeContent />
      </SQYLOOMAuthProvider>
    )
  }),
  { ssr: false }
)

export default function PersonalHomePage() {
  return <DynamicPersonalHome />
}
