"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  LucidePalette,
  LucideBrain,
  LucideHeart,
  LucideZap,
  LucideShare2,
  LucideDownload,
  LucideSparkles,
  LucideInfinity,
  LucideSearch,
  LucideFilter,
  LucideMaximize,
} from "lucide-react"

interface ArtPiece {
  id: string
  title: string
  description: string
  imageUrl: string
  category: "portrait" | "landscape" | "abstract" | "surreal" | "digital" | "mixed"
  aiModel: string
  humanInput: string
  creationDate: string
  dimensions: string
  style: string
  emotions: string[]
  techniques: string[]
  featured: boolean
}

export default function AIArtGallery() {
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "masonry" | "showcase">("showcase")

  // Sample art pieces - replace with your actual artwork data
  const artPieces: ArtPiece[] = [
    {
      id: "fusion-001",
      title: "Quantum Dreams of Tomorrow",
      description:
        "A breathtaking fusion where human imagination meets AI precision, creating a vision of tomorrow that transcends reality.",
      imageUrl: "/placeholder.svg?height=800&width=600",
      category: "digital",
      aiModel: "DALL-E 3 + Midjourney",
      humanInput: "Emotional depth, color harmony, compositional flow",
      creationDate: "2024-01-15",
      dimensions: "4096x3072",
      style: "Neo-Futuristic Surrealism",
      emotions: ["Wonder", "Hope", "Transcendence"],
      techniques: ["AI Generation", "Human Curation", "Digital Enhancement"],
      featured: true,
    },
    {
      id: "fusion-002",
      title: "Echoes of the Digital Soul",
      description:
        "Where human consciousness meets artificial intelligence, creating art that speaks to both silicon and soul.",
      imageUrl: "/placeholder.svg?height=800&width=600",
      category: "abstract",
      aiModel: "Stable Diffusion XL",
      humanInput: "Emotional resonance, spiritual depth, color psychology",
      creationDate: "2024-01-20",
      dimensions: "3840x2160",
      style: "Digital Expressionism",
      emotions: ["Introspection", "Connection", "Awakening"],
      techniques: ["Neural Networks", "Human Guidance", "Iterative Refinement"],
      featured: true,
    },
    {
      id: "fusion-003",
      title: "The Architect of Dreams",
      description:
        "A portrait that captures the essence of creation itself - the moment when human vision guides artificial intelligence to birth new realities.",
      imageUrl: "/placeholder.svg?height=800&width=600",
      category: "portrait",
      aiModel: "Midjourney v6",
      humanInput: "Character depth, lighting mastery, emotional storytelling",
      creationDate: "2024-02-01",
      dimensions: "2048x2048",
      style: "Hyperrealistic Fantasy",
      emotions: ["Determination", "Vision", "Power"],
      techniques: ["AI Portraiture", "Human Direction", "Style Transfer"],
      featured: false,
    },
    {
      id: "fusion-004",
      title: "Infinite Possibilities",
      description:
        "A landscape that exists nowhere and everywhere - born from the marriage of human creativity and artificial intelligence.",
      imageUrl: "/placeholder.svg?height=800&width=600",
      category: "landscape",
      aiModel: "DALL-E 3",
      humanInput: "Atmospheric mood, impossible geometry, emotional landscape",
      creationDate: "2024-02-10",
      dimensions: "5120x2880",
      style: "Surreal Realism",
      emotions: ["Awe", "Mystery", "Exploration"],
      techniques: ["Prompt Engineering", "Human Curation", "Post-Processing"],
      featured: true,
    },
  ]

  const filteredArt = artPieces.filter((piece) => {
    const matchesFilter = filter === "all" || piece.category === filter
    const matchesSearch =
      piece.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      piece.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      piece.style.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const ArtCard = ({ piece, size = "normal" }: { piece: ArtPiece; size?: "normal" | "large" | "featured" }) => {
    const cardClass = size === "featured" ? "col-span-2 row-span-2" : size === "large" ? "col-span-2" : ""

    return (
      <Card
        className={`quantum-border hologram cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl group ${cardClass}`}
        onClick={() => setSelectedPiece(piece)}
      >
        <div className="relative overflow-hidden">
          <img
            src={piece.imageUrl || "/placeholder.svg"}
            alt={piece.title}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {piece.featured && (
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
              <LucideSparkles className="mr-1 h-3 w-3" />
              Featured
            </Badge>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-bold text-lg mb-1">{piece.title}</h3>
            <p className="text-sm opacity-90 line-clamp-2">{piece.description}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs border-cyan-400 text-cyan-400">
                <LucideBrain className="mr-1 h-2 w-2" />
                {piece.aiModel}
              </Badge>
              <Badge variant="outline" className="text-xs border-pink-400 text-pink-400">
                <LucideHeart className="mr-1 h-2 w-2" />
                Human Touch
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const ArtModal = ({ piece }: { piece: ArtPiece }) => (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="quantum-border bg-background/95 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="quantum-text text-2xl">{piece.title}</CardTitle>
              <p className="text-muted-foreground">{piece.style}</p>
            </div>
            <Button variant="ghost" onClick={() => setSelectedPiece(null)}>
              ✕
            </Button>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={piece.imageUrl || "/placeholder.svg"}
                alt={piece.title}
                className="w-full rounded-lg quantum-border"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <LucideInfinity className="h-4 w-4 text-primary" />
                  Human-AI Fusion Details
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{piece.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-1">AI Model</h4>
                  <Badge variant="outline" className="text-xs">
                    <LucideBrain className="mr-1 h-3 w-3" />
                    {piece.aiModel}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Human Input</h4>
                  <p className="text-xs text-muted-foreground">{piece.humanInput}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Emotions Captured</h4>
                <div className="flex flex-wrap gap-1">
                  {piece.emotions.map((emotion) => (
                    <Badge key={emotion} variant="outline" className="text-xs border-pink-400 text-pink-400">
                      {emotion}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Techniques Used</h4>
                <div className="flex flex-wrap gap-1">
                  {piece.techniques.map((technique) => (
                    <Badge key={technique} variant="outline" className="text-xs border-cyan-400 text-cyan-400">
                      {technique}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div>
                  <span className="font-medium">Created:</span> {piece.creationDate}
                </div>
                <div>
                  <span className="font-medium">Dimensions:</span> {piece.dimensions}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 quantum-glow">
                  <LucideDownload className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1">
                  <LucideShare2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="w-full space-y-6">
      {/* Gallery Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <LucidePalette className="h-8 w-8 text-primary quantum-glow" />
          <h1 className="text-4xl font-bold quantum-text">Human-AI Art Fusion Gallery</h1>
          <LucideBrain className="h-8 w-8 text-secondary quantum-glow" />
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Where human creativity meets artificial intelligence to birth art that transcends the boundaries of
          imagination. Each piece is a testament to the beautiful symbiosis between human soul and digital
          consciousness.
        </p>

        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="quantum-border">
            <LucideSparkles className="mr-1 h-3 w-3" />
            {artPieces.length} Masterpieces
          </Badge>
          <Badge variant="outline" className="quantum-border">
            <LucideInfinity className="mr-1 h-3 w-3" />
            Human-AI Collaboration
          </Badge>
          <Badge variant="outline" className="quantum-border">
            <LucideZap className="mr-1 h-3 w-3" />
            Revolutionary Art
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <Card className="quantum-panel">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <LucideSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search artworks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 quantum-border"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 rounded quantum-border bg-background text-foreground"
              >
                <option value="all">All Categories</option>
                <option value="portrait">Portraits</option>
                <option value="landscape">Landscapes</option>
                <option value="abstract">Abstract</option>
                <option value="surreal">Surreal</option>
                <option value="digital">Digital</option>
                <option value="mixed">Mixed Media</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "showcase" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("showcase")}
              >
                <LucideMaximize className="mr-1 h-4 w-4" />
                Showcase
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <LucideFilter className="mr-1 h-4 w-4" />
                Grid
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Art Gallery */}
      <div
        className={`grid gap-6 ${
          viewMode === "showcase"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {filteredArt.map((piece, index) => (
          <ArtCard
            key={piece.id}
            piece={piece}
            size={viewMode === "showcase" && piece.featured ? "featured" : "normal"}
          />
        ))}
      </div>

      {/* Art Modal */}
      {selectedPiece && <ArtModal piece={selectedPiece} />}

      {/* Gallery Stats */}
      <Card className="quantum-border hologram">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold quantum-text mb-4">The Future of Art is Here</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-primary">{artPieces.length}</div>
              <div className="text-sm text-muted-foreground">Artworks Created</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">∞</div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground">Human-AI Fusion</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">🎨</div>
              <div className="text-sm text-muted-foreground">Revolutionary</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
