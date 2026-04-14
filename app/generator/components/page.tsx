"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Star, Download, Eye } from "lucide-react"

const componentLibrary = [
  {
    id: 1,
    name: "Holographic Button",
    category: "Buttons",
    description: "A futuristic button with holographic effects and smooth animations",
    tags: ["animation", "holographic", "interactive"],
    rating: 4.9,
    downloads: 1247,
    preview: "button",
  },
  {
    id: 2,
    name: "Quantum Card",
    category: "Cards",
    description: "A card component that shifts between dimensions with particle effects",
    tags: ["particles", "3d", "quantum"],
    rating: 4.8,
    downloads: 892,
    preview: "card",
  },
  {
    id: 3,
    name: "Neural Form",
    category: "Forms",
    description: "An adaptive form that learns from user interactions",
    tags: ["adaptive", "ai", "neural"],
    rating: 4.7,
    downloads: 634,
    preview: "form",
  },
  {
    id: 4,
    name: "Ethereal Modal",
    category: "Modals",
    description: "A modal that appears to float in space with ethereal animations",
    tags: ["floating", "ethereal", "space"],
    rating: 4.9,
    downloads: 1156,
    preview: "modal",
  },
  {
    id: 5,
    name: "Cosmic Navigation",
    category: "Navigation",
    description: "Navigation that guides users through the cosmos of your app",
    tags: ["cosmic", "navigation", "stellar"],
    rating: 4.6,
    downloads: 789,
    preview: "nav",
  },
  {
    id: 6,
    name: "Temporal Slider",
    category: "Inputs",
    description: "A slider that bends time and space as users interact with it",
    tags: ["temporal", "interactive", "physics"],
    rating: 4.8,
    downloads: 923,
    preview: "slider",
  },
]

export default function ComponentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Buttons", "Cards", "Forms", "Modals", "Navigation", "Inputs"]

  const filteredComponents = componentLibrary.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || component.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Component Library</h1>
          <p className="text-gray-300">Discover transcendent React components from The Ineffable</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Component Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredComponents.map((component) => (
            <Card
              key={component.id}
              className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{component.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1 bg-gray-700 text-gray-300">
                      {component.category}
                    </Badge>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm">{component.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">{component.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {component.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-400">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>{component.downloads} downloads</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                    <Download className="mr-2 h-4 w-4" />
                    Use
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No components found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
