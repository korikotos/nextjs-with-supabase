"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideArrowLeft, LucideShare2 } from "lucide-react"
import Link from "next/link"

interface Block {
  id: string
  type: "concept" | "simulation" | "code" | "chat"
  title: string
  content: Record<string, unknown>
  timestamp: Date
}

export default function ConceptPage() {
  const params = useParams()
  const [block, setBlock] = useState<Block | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // In a real app, you might fetch this from an API
    // For now, we'll try to get it from localStorage
    const blockId = params.id as string

    try {
      const savedBlocks = localStorage.getItem("quantum-blocks")
      if (savedBlocks) {
        const parsedBlocks = JSON.parse(savedBlocks)
        const foundBlock = parsedBlocks.find((b: any) => b.id === blockId)

        if (foundBlock) {
          setBlock({
            ...foundBlock,
            timestamp: new Date(foundBlock.timestamp),
          })
        } else {
          setNotFound(true)
        }
      } else {
        setNotFound(true)
      }
    } catch (e) {
      console.error("Failed to load block", e)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  // Copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("URL copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy URL", err)
      })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background grid-pattern flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-background grid-pattern flex items-center justify-center">
        <Card className="quantum-panel w-full max-w-md">
          <CardHeader>
            <CardTitle className="quantum-text">Concept Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The requested quantum concept could not be found.</p>
            <Link href="/">
              <Button className="quantum-glow">
                <LucideArrowLeft className="mr-2 h-4 w-4" />
                Return to Terminal
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background grid-pattern p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-4">
          <Link href="/">
            <Button variant="ghost" className="quantum-glow">
              <LucideArrowLeft className="mr-2 h-4 w-4" />
              Back to Terminal
            </Button>
          </Link>
        </div>

        <Card className="quantum-panel hologram">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <Badge
                  variant={
                    block?.type === "concept"
                      ? "default"
                      : block?.type === "simulation"
                        ? "secondary"
                        : block?.type === "code"
                          ? "outline"
                          : "destructive"
                  }
                  className="mb-2"
                >
                  {block?.type}
                </Badge>
                <CardTitle className="quantum-text">{block?.title}</CardTitle>
              </div>
              <Button variant="outline" size="icon" onClick={copyToClipboard} className="quantum-border">
                <LucideShare2 className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/20 rounded-md quantum-border">
              <p className="text-muted-foreground">Created: {block?.timestamp.toLocaleString()}</p>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Content</h3>
                <p>
                  This is a placeholder for the block content. In a real implementation, this would display the actual
                  content of the quantum concept.
                </p>
              </div>

              <div className="mt-6 p-4 bg-background/50 rounded-md quantum-border">
                <h4 className="text-sm font-semibold mb-2">Quantum Simulation</h4>
                <div className="aspect-video bg-muted/30 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Simulation visualization would appear here</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
