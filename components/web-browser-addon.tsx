"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  LucideGlobe,
  LucideArrowLeft,
  LucideArrowRight,
  LucideRefreshCw,
  LucideHome,
  LucideBookmark,
  LucideShield,
  LucideBrain,
} from "lucide-react"
import QuantumStealthProcessor from "./quantum-stealth-processor"

export default function WebBrowserAddon() {
  const [url, setUrl] = useState("https://example.com")
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [activeMode, setActiveMode] = useState<"browser" | "stealth">("browser")
  const [activeTool, setActiveTool] = useState<"browser" | "sqyloom">("browser")

  const navigate = (newUrl: string) => {
    setIsLoading(true)
    setUrl(newUrl)

    // Add to history
    const newHistory = [...history.slice(0, currentIndex + 1), newUrl]
    setHistory(newHistory)
    setCurrentIndex(newHistory.length - 1)

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setUrl(history[currentIndex - 1])
    }
  }

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUrl(history[currentIndex + 1])
    }
  }

  const refresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 500)
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(url)
  }

  return (
    <Card className="quantum-panel h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <LucideGlobe className="h-5 w-5 text-primary quantum-glow" />
          Quantum Browser
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Mode Selector */}
        <div className="p-3 border-b border-border">
          <div className="flex gap-2 mb-3">
            <Button
              variant={activeMode === "browser" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveMode("browser")}
              className={activeMode === "browser" ? "quantum-glow" : ""}
            >
              <LucideGlobe className="mr-2 h-4 w-4" />
              Browser
            </Button>
            <Button
              variant={activeMode === "stealth" ? "destructive" : "outline"}
              size="sm"
              onClick={() => setActiveMode("stealth")}
              className={activeMode === "stealth" ? "quantum-glow" : ""}
            >
              <LucideShield className="mr-2 h-4 w-4" />
              Sonic Nuke
            </Button>
          </div>

          {activeMode === "browser" && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goBack} disabled={currentIndex <= 0}>
                  <LucideArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={goForward}
                  disabled={currentIndex >= history.length - 1}
                >
                  <LucideArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={refresh}>
                  <LucideRefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate("https://example.com")}>
                  <LucideHome className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleUrlSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                  <LucideShield className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-8 quantum-border"
                    placeholder="Enter URL or search..."
                  />
                </div>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <LucideBookmark className="h-4 w-4" />
                </Button>
              </form>

              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="quantum-border">
                  <LucideShield className="mr-1 h-3 w-3" />
                  Secure
                </Badge>
                <Badge variant="outline" className="quantum-border">
                  Neural Mode
                </Badge>
              </div>
            </>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 bg-background/50 overflow-y-auto">
          {activeMode === "stealth" ? (
            <QuantumStealthProcessor />
          ) : (
            // Original browser content here
            <>
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <div
                      className="w-3 h-3 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold quantum-text">Quantum Web Interface</h3>
                    <p className="text-muted-foreground">Neural-enhanced browsing experience</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 gap-3">
                    <Card className="quantum-border">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <LucideBrain className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">SQYLOOM Browser</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          AI-powered neural navigation with adaptive interface
                        </p>
                        <Button size="sm" className="mt-3 w-full quantum-glow" onClick={() => setActiveTool("sqyloom")}>
                          Launch
                        </Button>
                      </div>
                    </Card>

                    <Card className="quantum-border">
                      <CardContent className="p-3">
                        <h4 className="font-medium mb-1">Content Analysis</h4>
                        <p className="text-xs text-muted-foreground">
                          Real-time content summarization and key information extraction
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="quantum-border">
                      <CardContent className="p-3">
                        <h4 className="font-medium mb-1">Privacy Shield</h4>
                        <p className="text-xs text-muted-foreground">
                          Advanced privacy protection with local AI processing
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center mt-6">
                    <Button onClick={() => navigate("https://sqyloom.uk")} className="quantum-glow">
                      Launch SQYLOOM Browser
                    </Button>
                    <Button
                      onClick={() => setActiveMode("stealth")}
                      variant="destructive"
                      className="ml-2 quantum-glow"
                    >
                      Activate Sonic Nuke
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
