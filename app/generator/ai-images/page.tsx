"use client"

import React from "react"
import { Download, Sparkles, Palette, Wand2, ExternalLink, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function AIImagesPage() {
  // === State for Image Generator ===
  const [prompt, setPrompt] = React.useState("")
  const [imageUrl, setImageUrl] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // === State for Animated Greeting ===
  const [fullGreeting, setFullGreeting] = React.useState("")
  const [displayedWords, setDisplayedWords] = React.useState<string[]>([])

  React.useEffect(() => {
    const currentHour = new Date().getHours()
    let mood = "neutral"
    const userName = "Creator"

    if (currentHour < 6) mood = "dreamy"
    else if (currentHour < 12) mood = "energized"
    else if (currentHour < 18) mood = "focused"
    else mood = "reflective"

    const greetingStyles = {
      dreamy: `✨ The night whispers, ${userName}. What dreams shall we awaken?`,
      energized: `☀️ A new day, a new canvas, ${userName}. Let's craft brilliance!`,
      focused: `🔥 The world awaits your ideas, ${userName}. Let's sculpt reality.`,
      reflective: `🌙 The stars listen, ${userName}. What shall we weave into the universe?`,
    }

    setFullGreeting(greetingStyles[mood as keyof typeof greetingStyles])
  }, [])

  React.useEffect(() => {
    if (fullGreeting) {
      const words = fullGreeting.split(" ")
      setDisplayedWords([])
      const timeouts: NodeJS.Timeout[] = []

      words.forEach((word, index) => {
        const timeoutId = setTimeout(() => {
          setDisplayedWords((prevWords) => [...prevWords, word])
        }, index * 350)
        timeouts.push(timeoutId)
      })

      return () => {
        timeouts.forEach(clearTimeout)
      }
    }
  }, [fullGreeting])

  // Function to handle image generation
  const generateImage = React.useCallback(async () => {
    if (!prompt) {
      setError("Please enter a prompt.")
      return
    }

    setLoading(true)
    setError(null)
    setImageUrl("") // Clear previous image

    try {
      // Simulate API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // For demo, we'll use a placeholder image with the prompt
      const demoImageUrl = `/placeholder.svg?height=512&width=512&text=${encodeURIComponent(prompt.slice(0, 50))}`
      setImageUrl(demoImageUrl)
    } catch (err) {
      console.error("Error during image generation:", err)
      setError("An error occurred while generating the image.")
    } finally {
      setLoading(false)
    }
  }, [prompt])

  // Helper function to open share URLs
  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400")
  }

  const shareButtons = [
    {
      name: "DeviantArt",
      color: "bg-green-600 hover:bg-green-700",
      url: `https://www.deviantart.com/submit?url=${encodeURIComponent(imageUrl)}&title=${encodeURIComponent(prompt || "AI Generated Art")}`,
    },
    {
      name: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}&quote=${encodeURIComponent(prompt || "Check out this AI art!")}`,
    },
    {
      name: "Pinterest",
      color: "bg-red-600 hover:bg-red-700",
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(imageUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(prompt || "AI Generated Artwork")}`,
    },
    {
      name: "Instagram",
      color: "bg-pink-500 hover:bg-pink-600",
      url: "https://www.instagram.com",
    },
  ]

  // Download function
  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = `${filename.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Save to portfolio function
  const saveToPortfolio = (url: string, prompt: string) => {
    const artwork = {
      id: Date.now(),
      url,
      prompt,
      createdAt: new Date().toISOString(),
      type: "ai-generated",
    }

    const existingPortfolio = JSON.parse(localStorage.getItem("ineffable-portfolio") || "[]")
    existingPortfolio.push(artwork)
    localStorage.setItem("ineffable-portfolio", JSON.stringify(existingPortfolio))

    // Show success message
    alert("Artwork saved to your portfolio!")
  }

  // Export to Sqyloom function
  const exportToSqyloom = (url: string, prompt: string) => {
    // Create export data
    const exportData = {
      title: prompt,
      imageUrl: url,
      createdAt: new Date().toISOString(),
      source: "The Ineffable AI Generator",
      category: "expressionism",
    }

    // For now, copy to clipboard - later can be API integration
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2))
    alert("Export data copied to clipboard! You can now paste this into your Sqyloom.uk expressionism page.")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-purple-400 to-yellow-300 mb-2">
                SkyLoom AI Generator
              </h1>
              <p className="text-gray-300">Transcendent AI-powered image creation within The Ineffable</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-purple-500 text-purple-400">
                <Sparkles className="mr-1 h-3 w-3" />
                AI Powered
              </Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-400">
                <Palette className="mr-1 h-3 w-3" />
                Creative
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Animated Greeting */}
        <div className="text-center mb-12">
          <div className="h-16 flex items-center justify-center">
            <div className="text-2xl font-bold text-amber-400">
              {displayedWords.map((word, index) => (
                <span
                  key={index}
                  className="inline-block mr-2 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Side: Image Generator */}
          <Card className="bg-gradient-to-br from-indigo-900/70 to-purple-900/70 border-indigo-400 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-yellow-300 flex items-center justify-center">
                <Wand2 className="mr-3 h-8 w-8" />
                Image Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Describe your vision</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Paint your vision onto the canvas... (e.g., 'A mystical forest with glowing trees under a starry sky')"
                  className="bg-black/60 border-yellow-500/70 text-slate-100 placeholder-slate-300 focus:border-yellow-400 focus:ring-yellow-400 min-h-[120px]"
                  disabled={loading}
                />
              </div>

              <Button
                onClick={generateImage}
                disabled={loading || !prompt.trim()}
                className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-black font-bold py-3 text-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Image
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg">
                  <p className="text-red-300 text-center">{error}</p>
                </div>
              )}

              {loading && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center text-yellow-300">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-300 mr-3"></div>
                    Weaving your vision into reality...
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Side: Generated Image & Actions */}
          <Card className="bg-gradient-to-br from-gray-900/70 to-black/70 border-cyan-400 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-cyan-300">Your Creation</CardTitle>
            </CardHeader>
            <CardContent>
              {imageUrl ? (
                <div className="space-y-6">
                  <div className="relative group">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt="Generated artwork"
                      className="w-full h-auto rounded-lg border-2 border-cyan-400/50 shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 bg-transparent"
                        onClick={() => downloadImage(imageUrl, prompt)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        className="border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 bg-transparent"
                        onClick={() => saveToPortfolio(imageUrl, prompt)}
                      >
                        <FolderOpen className="mr-2 h-4 w-4" />
                        Save to Portfolio
                      </Button>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => exportToSqyloom(imageUrl, prompt)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Export to Sqyloom.uk
                    </Button>
                  </div>

                  {/* Social Share Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {shareButtons.map((button) => (
                      <Button
                        key={button.name}
                        size="sm"
                        className={`${button.color} text-white transition-colors`}
                        onClick={() => openShareWindow(button.url)}
                      >
                        {button.name}
                      </Button>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      onClick={() => window.open("https://www.etsy.com/sell", "_blank")}
                    >
                      Sell on Etsy
                    </Button>
                  </div>

                  <p className="text-xs text-cyan-200 text-center">
                    *For Instagram: Save image and upload via the Instagram app
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20 flex items-center justify-center mb-6">
                    <Palette className="h-12 w-12 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">Your masterpiece awaits</h3>
                  <p className="text-gray-500">Enter a prompt and generate your first AI artwork</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Gallery Section */}
        <div className="mt-16">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">Recent Creations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg border border-gray-600 flex items-center justify-center"
                  >
                    <Palette className="h-8 w-8 text-gray-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
