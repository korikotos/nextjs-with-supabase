"use client"

import { useState } from "react"
import { ArrowRight, Copy, Download, Eye, Code, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CodePreview from "@/components/code-preview"
import GeneratedComponent from "@/components/generated-component"

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState("")
  const [componentType, setComponentType] = useState("button")
  const [generatedCode, setGeneratedCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const generateComponent = async () => {
    if (!prompt.trim()) {
      setError("Please describe the component you want to generate.")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-component", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, componentType }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate component.")
      }

      setGeneratedCode(data.code)
    } catch (err) {
      console.error("Error during component generation:", err)
      setError(err instanceof Error ? err.message : "An error occurred while generating the component.")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode)
  }

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `generated-${componentType}.tsx`
    a.click()
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">React Bits Generator</h1>
          <p className="text-gray-300">Harness The Ineffable's power to create transcendent React components</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-400" />
                  Component Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Component Type</label>
                  <Select value={componentType} onValueChange={setComponentType}>
                    <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="button">Button</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="form">Form</SelectItem>
                      <SelectItem value="modal">Modal</SelectItem>
                      <SelectItem value="navigation">Navigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Describe Your Component</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the component you want to generate... (e.g., 'A glowing button with an icon that pulses on hover')"
                    className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={generateComponent}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Component
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {error && <p className="text-sm text-red-400">{error}</p>}
              </CardContent>
            </Card>

            {/* Generated Code */}
            {generatedCode && (
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <Code className="mr-2 h-5 w-5 text-blue-400" />
                      Generated Code
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        {showPreview ? "Hide" : "Show"} Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyCode}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadCode}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CodePreview code={generatedCode} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            {generatedCode && showPreview && (
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Eye className="mr-2 h-5 w-5 text-green-400" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-8 bg-gray-900/50 rounded-lg border border-gray-700">
                    <GeneratedComponent type={componentType} prompt={prompt} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Component Library */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Component Library</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Glowing Button", "Futuristic Card", "Animated Form", "Holographic Modal"].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <span className="text-gray-300">{item}</span>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                        Use
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
