"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Smartphone, Tablet, Download, Eye, Grid, Layout } from "lucide-react"

const layoutTemplates = [
  {
    id: 1,
    name: "Cosmic Dashboard",
    description: "A futuristic dashboard layout with floating panels and holographic elements",
    category: "Dashboard",
    responsive: true,
    components: ["Header", "Sidebar", "Main Content", "Footer"],
    preview: "/placeholder.svg?height=200&width=300&text=Cosmic+Dashboard",
  },
  {
    id: 2,
    name: "Ethereal Landing",
    description: "A mystical landing page layout with particle backgrounds and smooth scrolling",
    category: "Landing Page",
    responsive: true,
    components: ["Hero", "Features", "Testimonials", "CTA"],
    preview: "/placeholder.svg?height=200&width=300&text=Ethereal+Landing",
  },
  {
    id: 3,
    name: "Neural Grid",
    description: "A grid-based layout that adapts like a neural network to content",
    category: "Grid",
    responsive: true,
    components: ["Dynamic Grid", "Card System", "Filters"],
    preview: "/placeholder.svg?height=200&width=300&text=Neural+Grid",
  },
  {
    id: 4,
    name: "Quantum Blog",
    description: "A blog layout that exists in multiple dimensions simultaneously",
    category: "Blog",
    responsive: true,
    components: ["Article List", "Sidebar", "Comments", "Navigation"],
    preview: "/placeholder.svg?height=200&width=300&text=Quantum+Blog",
  },
  {
    id: 5,
    name: "Stellar Portfolio",
    description: "A portfolio layout that showcases work across the cosmos",
    category: "Portfolio",
    responsive: true,
    components: ["Gallery", "About", "Contact", "Projects"],
    preview: "/placeholder.svg?height=200&width=300&text=Stellar+Portfolio",
  },
  {
    id: 6,
    name: "Temporal E-commerce",
    description: "An e-commerce layout that transcends traditional shopping experiences",
    category: "E-commerce",
    responsive: true,
    components: ["Product Grid", "Cart", "Checkout", "User Account"],
    preview: "/placeholder.svg?height=200&width=300&text=Temporal+Ecommerce",
  },
]

export default function LayoutsPage() {
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Layout Templates</h1>
          <p className="text-gray-300">Transcendent layouts that adapt across dimensions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Layout List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Available Layouts</h2>
            {layoutTemplates.map((layout) => (
              <Card
                key={layout.id}
                className={`bg-gray-800/50 border-gray-700 backdrop-blur-sm cursor-pointer transition-all ${
                  selectedLayout === layout.id ? "ring-2 ring-purple-500" : "hover:bg-gray-800/70"
                }`}
                onClick={() => setSelectedLayout(layout.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{layout.name}</CardTitle>
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      {layout.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-3">{layout.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-400 text-sm">
                      <Grid className="h-4 w-4 mr-1" />
                      {layout.components.length} components
                    </div>
                    {layout.responsive && (
                      <Badge variant="outline" className="text-xs border-green-600 text-green-400">
                        Responsive
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            {selectedLayout ? (
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">
                      {layoutTemplates.find((l) => l.id === selectedLayout)?.name} Preview
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex bg-gray-700 rounded-lg p-1">
                        <Button
                          variant={viewMode === "desktop" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("desktop")}
                          className="h-8 w-8 p-0"
                        >
                          <Monitor className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === "tablet" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("tablet")}
                          className="h-8 w-8 p-0"
                        >
                          <Tablet className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === "mobile" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("mobile")}
                          className="h-8 w-8 p-0"
                        >
                          <Smartphone className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <Download className="mr-2 h-4 w-4" />
                        Use Layout
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className={`bg-gray-900 rounded-lg p-4 ${
                      viewMode === "mobile"
                        ? "max-w-sm mx-auto"
                        : viewMode === "tablet"
                          ? "max-w-2xl mx-auto"
                          : "w-full"
                    }`}
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Layout className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                        <p className="text-gray-300">
                          {layoutTemplates.find((l) => l.id === selectedLayout)?.name} Layout
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Component List */}
                  <div className="mt-6">
                    <h3 className="text-white font-semibold mb-3">Included Components:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {layoutTemplates
                        .find((l) => l.id === selectedLayout)
                        ?.components.map((component) => (
                          <Badge
                            key={component}
                            variant="outline"
                            className="border-gray-600 text-gray-300 justify-center"
                          >
                            {component}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Layout className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Select a layout to preview</p>
                    <p className="text-gray-500 mt-2">Choose from our collection of transcendent layouts</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
