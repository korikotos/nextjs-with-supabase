"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Brain, Search, ExternalLink, History, Globe, Code, BookOpen, ShoppingCart } from "lucide-react"

interface BrowserSimulatorProps {
  aiEnabled: boolean
  mode: string
}

export default function BrowserSimulator({ aiEnabled, mode }: BrowserSimulatorProps) {
  const [query, setQuery] = useState("")
  const [currentUrl, setCurrentUrl] = useState("https://example.com")
  const [isNavigating, setIsNavigating] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [analysis, setAnalysis] = useState<any>(null)

  const navigationMap: Record<string, string> = {
    "research ai ethics": "https://arxiv.org/search/?query=ai+ethics&searchtype=all",
    "github deepseek": "https://github.com/deepseek-ai",
    "latest ai news": "https://www.artificialintelligence-news.com/",
    "python documentation": "https://docs.python.org/3/",
    "react tutorials": "https://react.dev/learn",
    "stackoverflow javascript": "https://stackoverflow.com/questions/tagged/javascript",
  }

  const handleNeuralNavigation = async () => {
    if (!query.trim() || !aiEnabled) return

    setIsNavigating(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const lowerQuery = query.toLowerCase()
    const targetUrl = navigationMap[lowerQuery] || `https://www.google.com/search?q=${encodeURIComponent(query)}`

    setCurrentUrl(targetUrl)
    setHistory((prev) => [targetUrl, ...prev.slice(0, 4)])

    // Simulate page analysis
    const mockAnalysis = {
      type: lowerQuery.includes("code") ? "technical" : lowerQuery.includes("research") ? "academic" : "general",
      complexity: "medium",
      topics: lowerQuery.includes("ai") ? ["artificial intelligence"] : ["general"],
      wordCount: Math.floor(Math.random() * 2000) + 500,
    }

    setAnalysis(mockAnalysis)
    setIsNavigating(false)
    setQuery("")
  }

  const getModeStyles = () => {
    switch (mode) {
      case "coding":
        return {
          bg: "bg-gray-900",
          text: "text-green-400",
          accent: "border-green-500",
        }
      case "research":
        return {
          bg: "bg-blue-50",
          text: "text-blue-900",
          accent: "border-blue-500",
        }
      case "shopping":
        return {
          bg: "bg-orange-50",
          text: "text-orange-900",
          accent: "border-orange-500",
        }
      default:
        return {
          bg: "bg-white",
          text: "text-gray-900",
          accent: "border-purple-500",
        }
    }
  }

  const styles = getModeStyles()

  return (
    <div className="space-y-6">
      {/* Browser Interface */}
      <Card className={`${styles.bg} ${styles.text}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            DeepSeek Browser Simulator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Address Bar */}
          <div className={`flex items-center gap-2 p-3 border-2 rounded-lg ${styles.accent}`}>
            <Globe className="w-4 h-4" />
            <span className="text-sm font-mono">{currentUrl}</span>
          </div>

          {/* Neural Navigation */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Neural Navigation</label>
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type natural language: 'research AI ethics' or 'find Python docs'"
                disabled={!aiEnabled}
                onKeyPress={(e) => e.key === "Enter" && handleNeuralNavigation()}
                className="flex-1"
              />
              <Button onClick={handleNeuralNavigation} disabled={!query.trim() || isNavigating || !aiEnabled}>
                {isNavigating ? "Processing..." : <Search className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {!aiEnabled && (
            <div className="text-center text-sm text-gray-500">AI is disabled. Enable AI to use neural navigation.</div>
          )}

          {/* Mode Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Current Mode:</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              {mode === "coding" && <Code className="w-3 h-3" />}
              {mode === "research" && <BookOpen className="w-3 h-3" />}
              {mode === "shopping" && <ShoppingCart className="w-3 h-3" />}
              {mode === "general" && <Brain className="w-3 h-3" />}
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Page Analysis */}
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>AI Page Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600">Content Type</div>
                <div className="font-medium">{analysis.type}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Complexity</div>
                <div className="font-medium">{analysis.complexity}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Word Count</div>
                <div className="font-medium">{analysis.wordCount}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Reading Time</div>
                <div className="font-medium">{Math.ceil(analysis.wordCount / 200)} min</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-2">Detected Topics</div>
              <div className="flex flex-wrap gap-2">
                {analysis.topics.map((topic: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Mode-specific features */}
            {mode === "coding" && (
              <div className="p-3 bg-gray-900 text-green-400 rounded-lg font-mono text-sm">
                <div className="mb-2">// Code enhancement features active</div>
                <div>✓ Syntax highlighting enabled</div>
                <div>✓ Copy buttons added to code blocks</div>
                <div>✓ Dark theme applied</div>
              </div>
            )}

            {mode === "research" && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                <div className="font-medium mb-2">Research Mode Enhancements</div>
                <div>✓ Increased line height for readability</div>
                <div>✓ Citation tools available</div>
                <div>✓ Academic formatting applied</div>
              </div>
            )}

            {mode === "shopping" && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm">
                <div className="font-medium mb-2">Shopping Mode Features</div>
                <div>✓ Price highlighting active</div>
                <div>✓ Deal detection enabled</div>
                <div>✓ Comparison tools ready</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation History */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Navigation History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.map((url, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-mono truncate">{url}</span>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentUrl(url)}>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Example Queries */}
      <Card>
        <CardHeader>
          <CardTitle>Try Neural Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.keys(navigationMap).map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setQuery(example)}
                disabled={!aiEnabled}
                className="justify-start"
              >
                {example}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
