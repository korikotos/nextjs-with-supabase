"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Search, Zap, Shield, Code, BookOpen, ShoppingCart } from "lucide-react"
import TranslationEngine from "@/components/translation-engine"
import BrowserSimulator from "@/components/browser-simulator"

export default function DeepSeekBrowser() {
  const [activeMode, setActiveMode] = useState("general")
  const [aiEnabled, setAiEnabled] = useState(true)

  const modes = [
    { id: "general", name: "General", icon: Brain, color: "bg-blue-500" },
    { id: "coding", name: "Coding", icon: Code, color: "bg-green-500" },
    { id: "research", name: "Research", icon: BookOpen, color: "bg-purple-500" },
    { id: "shopping", name: "Shopping", icon: ShoppingCart, color: "bg-orange-500" },
  ]

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        activeMode === "coding"
          ? "bg-gray-900 text-green-400"
          : activeMode === "research"
            ? "bg-blue-50 text-blue-900"
            : activeMode === "shopping"
              ? "bg-orange-50 text-orange-900"
              : "bg-gradient-to-br from-purple-50 to-blue-50"
      }`}
    >
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                DeepSeek Browser
              </h1>
              <Badge variant="secondary">AI-Powered</Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${aiEnabled ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm text-gray-600">AI {aiEnabled ? "Active" : "Disabled"}</span>
              </div>
              <Button
                variant={aiEnabled ? "destructive" : "default"}
                size="sm"
                onClick={() => setAiEnabled(!aiEnabled)}
              >
                {aiEnabled ? "Disable AI" : "Enable AI"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("deepseek_unlocked")
                  window.location.href = "/lock"
                }}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Mode Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Browsing Mode</h2>
          <div className="flex gap-3 flex-wrap">
            {modes.map((mode) => {
              const Icon = mode.icon
              return (
                <Button
                  key={mode.id}
                  variant={activeMode === mode.id ? "default" : "outline"}
                  onClick={() => setActiveMode(mode.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {mode.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="translation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="translation">Translation Engine</TabsTrigger>
            <TabsTrigger value="browser">Browser Simulator</TabsTrigger>
          </TabsList>

          <TabsContent value="translation">
            <TranslationEngine aiEnabled={aiEnabled} />
          </TabsContent>

          <TabsContent value="browser">
            <BrowserSimulator aiEnabled={aiEnabled} mode={activeMode} />
          </TabsContent>
        </Tabs>

        {/* Features Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Neural Navigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Navigate using natural language. Type "research AI ethics" or "find Python docs" and let AI understand
                your intent.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Adaptive Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                UI automatically adapts based on content type - coding mode for GitHub, reading mode for articles,
                shopping mode for e-commerce.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Local AI processing with optional cloud enhancement. Your browsing data stays private and secure.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Keyboard Shortcuts */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Keyboard Shortcuts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Toggle AI Panel</span>
                <Badge variant="outline">Ctrl+Shift+D</Badge>
              </div>
              <div className="flex justify-between">
                <span>Neural Navigation</span>
                <Badge variant="outline">Ctrl+Shift+N</Badge>
              </div>
              <div className="flex justify-between">
                <span>Quick Analysis</span>
                <Badge variant="outline">Right-click</Badge>
              </div>
              <div className="flex justify-between">
                <span>Voice Input</span>
                <Badge variant="outline">Ctrl+Shift+V</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
