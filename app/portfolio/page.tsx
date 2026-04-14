"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, ExternalLink, Search, Trash2, Calendar, ImageIcon, Video, Archive } from "lucide-react"

interface PortfolioItem {
  id: number
  url: string
  prompt: string
  createdAt: string
  type: "ai-generated" | "video" | "artwork"
  category?: string
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  useEffect(() => {
    // Load portfolio from localStorage
    const savedPortfolio = JSON.parse(localStorage.getItem("ineffable-portfolio") || "[]")
    setPortfolio(savedPortfolio)
  }, [])

  const filteredItems = portfolio.filter((item) => {
    const matchesSearch = item.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesType
  })

  const downloadItem = (item: PortfolioItem) => {
    const link = document.createElement("a")
    link.href = item.url
    link.download = `${item.prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "_")}_${item.id}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const deleteItem = (id: number) => {
    const updatedPortfolio = portfolio.filter((item) => item.id !== id)
    setPortfolio(updatedPortfolio)
    localStorage.setItem("ineffable-portfolio", JSON.stringify(updatedPortfolio))
  }

  const exportToSqyloom = (item: PortfolioItem) => {
    const exportData = {
      title: item.prompt,
      imageUrl: item.url,
      createdAt: item.createdAt,
      source: "The Ineffable",
      category: "expressionism",
      type: item.type,
    }

    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2))
    alert("Export data copied! Ready to paste into your Sqyloom.uk expressionism page.")
  }

  const exportAllToSqyloom = () => {
    const exportData = {
      collection: "The Ineffable Portfolio",
      exportedAt: new Date().toISOString(),
      items: filteredItems.map((item) => ({
        title: item.prompt,
        imageUrl: item.url,
        createdAt: item.createdAt,
        type: item.type,
        category: "expressionism",
      })),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `sqyloom-portfolio-export-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Your Portfolio</h1>
              <p className="text-gray-300">Manage your creative legacy across time and space</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-purple-500 text-purple-400">
                {portfolio.length} Items
              </Badge>
              <Button
                onClick={exportAllToSqyloom}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Archive className="mr-2 h-4 w-4" />
                Export All to Sqyloom
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search your creations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white"
              />
            </div>
            <div className="flex gap-2">
              {["all", "ai-generated", "video", "artwork"].map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={
                    selectedType === type
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  }
                >
                  {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {item.type === "ai-generated" && <ImageIcon className="h-4 w-4 text-purple-400" />}
                      {item.type === "video" && <Video className="h-4 w-4 text-blue-400" />}
                      {item.type === "artwork" && <ImageIcon className="h-4 w-4 text-pink-400" />}
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                        {item.type.replace("-", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gray-900/50 rounded-lg mb-4 overflow-hidden">
                    {item.type === "video" ? (
                      <video
                        src={item.url || "/placeholder.svg"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        muted
                        loop
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      />
                    ) : (
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={item.prompt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                  </div>

                  <h3 className="text-white font-semibold mb-2 line-clamp-2">{item.prompt}</h3>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadItem(item)}
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportToSqyloom(item)}
                      className="flex-1 border-purple-600 text-purple-400 hover:bg-purple-600/10 bg-transparent"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteItem(item.id)}
                      className="border-red-600 text-red-400 hover:bg-red-600/10 bg-transparent"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="h-12 w-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No creations yet</h3>
            <p className="text-gray-500 mb-6">Start creating AI art to build your portfolio</p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => (window.location.href = "/generator/ai-images")}
            >
              Create Your First Artwork
            </Button>
          </div>
        )}

        {/* Sqyloom Integration Guide */}
        <Card className="mt-12 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <ExternalLink className="mr-2 h-5 w-5 text-purple-400" />
              Sqyloom.uk Integration Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
              <h4 className="text-yellow-300 font-semibold mb-2">⚠️ Security Notice</h4>
              <p className="text-yellow-200 text-sm">
                Your website www.sqyloom.uk currently doesn't support HTTPS. Please enable SSL/TLS certificate for
                secure integration and to avoid browser warnings.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-semibold">How to integrate with your Expressionism page:</h4>
              <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                <li>Click "Export" on any artwork to copy the JSON data</li>
                <li>Use the exported data in your website's content management system</li>
                <li>The JSON includes title, image URL, creation date, and metadata</li>
                <li>You can also bulk export your entire portfolio</li>
              </ol>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Sample Export Format:</h4>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                {`{
  "title": "Mystical forest with glowing trees",
  "imageUrl": "https://example.com/image.png",
  "createdAt": "2025-01-28T10:48:19.000Z",
  "source": "The Ineffable AI Generator",
  "category": "expressionism",
  "type": "ai-generated"
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
