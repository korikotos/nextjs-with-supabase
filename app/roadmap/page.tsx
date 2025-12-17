"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  CheckCircle,
  Clock,
  Zap,
  Code,
  Users,
  Shield,
  Globe,
  Brain,
  Rocket,
  Target,
  TrendingUp,
  GitBranch,
  Star,
  FileText,
  ExternalLink,
} from "lucide-react"

interface RoadmapItem {
  id: string
  title: string
  description: string
  category: "core" | "ai" | "collaboration" | "infrastructure" | "legacy"
  priority: "high" | "medium" | "low"
  status: "completed" | "in-progress" | "planned" | "research"
  progress: number
  timeline: string
  dependencies?: string[]
  features: string[]
}

const roadmapData: RoadmapItem[] = [
  // Q1 2025 - Foundation
  {
    id: "react-generator",
    title: "React Component Generator",
    description: "AI-powered React component generation with live preview and export functionality",
    category: "core",
    priority: "high",
    status: "completed",
    progress: 100,
    timeline: "Q1 2025 - Completed",
    features: [
      "Text-to-component generation",
      "Live preview system",
      "Code export functionality",
      "Component library integration",
      "Responsive design support",
    ],
  },
  {
    id: "portfolio-system",
    title: "Portfolio Management",
    description: "Personal portfolio system for managing and organizing creative works",
    category: "core",
    priority: "high",
    status: "completed",
    progress: 100,
    timeline: "Q1 2025 - Completed",
    features: [
      "Local storage system",
      "Search and filtering",
      "Export functionality",
      "Multiple media types",
      "Basic organization tools",
    ],
  },
  {
    id: "video-upload",
    title: "Video Upload & Management",
    description: "Basic video upload, preview, and management capabilities",
    category: "core",
    priority: "medium",
    status: "completed",
    progress: 85,
    timeline: "Q1 2025 - Beta",
    features: [
      "Video file upload",
      "Preview functionality",
      "Basic playback controls",
      "Download capabilities",
      "Portfolio integration",
    ],
  },

  // Q2 2025 - AI Integration
  {
    id: "real-ai-images",
    title: "Real AI Image Generation",
    description: "Integration with actual AI image generation services (DALL-E, Midjourney, Stable Diffusion)",
    category: "ai",
    priority: "high",
    status: "in-progress",
    progress: 30,
    timeline: "Q2 2025 - In Development",
    dependencies: ["api-infrastructure"],
    features: [
      "Multiple AI model support",
      "Style customization",
      "Batch generation",
      "High-resolution output",
      "Advanced prompting",
    ],
  },
  {
    id: "ai-video-generation",
    title: "AI Video Generation",
    description: "Text-to-video generation using cutting-edge AI models",
    category: "ai",
    priority: "high",
    status: "planned",
    progress: 10,
    timeline: "Q2 2025 - Research Phase",
    dependencies: ["real-ai-images", "video-processing"],
    features: [
      "Text-to-video generation",
      "Video style transfer",
      "Animation creation",
      "Custom duration control",
      "Quality optimization",
    ],
  },
  {
    id: "enhanced-react-ai",
    title: "Advanced React AI",
    description: "More sophisticated AI for complex component generation and full page layouts",
    category: "ai",
    priority: "medium",
    status: "planned",
    progress: 20,
    timeline: "Q2 2025 - Planning",
    dependencies: ["react-generator"],
    features: [
      "Full page generation",
      "Complex component relationships",
      "State management integration",
      "API integration templates",
      "Advanced styling options",
    ],
  },

  // Q3 2025 - Cloud & Collaboration
  {
    id: "cloud-storage",
    title: "Cloud Storage & Sync",
    description: "Cloud-based storage system with cross-device synchronization",
    category: "infrastructure",
    priority: "high",
    status: "planned",
    progress: 0,
    timeline: "Q3 2025 - Development",
    dependencies: ["api-infrastructure"],
    features: [
      "Cloud portfolio storage",
      "Cross-device sync",
      "Backup and restore",
      "Version history",
      "Offline capabilities",
    ],
  },
  {
    id: "user-accounts",
    title: "User Authentication System",
    description: "Secure user accounts with personalized experiences",
    category: "infrastructure",
    priority: "high",
    status: "planned",
    progress: 0,
    timeline: "Q3 2025 - Development",
    features: [
      "Secure authentication",
      "User profiles",
      "Personalized settings",
      "Usage analytics",
      "Subscription management",
    ],
  },
  {
    id: "collaboration-basic",
    title: "Basic Collaboration",
    description: "Share portfolios and collaborate on creative projects",
    category: "collaboration",
    priority: "medium",
    status: "planned",
    progress: 0,
    timeline: "Q3 2025 - Planning",
    dependencies: ["user-accounts", "cloud-storage"],
    features: [
      "Portfolio sharing",
      "Comment system",
      "Basic project collaboration",
      "Public galleries",
      "Social features",
    ],
  },

  // Q4 2025 - Advanced Features
  {
    id: "api-infrastructure",
    title: "Robust API Infrastructure",
    description: "Scalable backend infrastructure for AI services and data management",
    category: "infrastructure",
    priority: "high",
    status: "in-progress",
    progress: 40,
    timeline: "Q4 2025 - Development",
    features: [
      "Scalable API architecture",
      "Rate limiting and quotas",
      "Multiple AI service integration",
      "Caching and optimization",
      "Monitoring and analytics",
    ],
  },
  {
    id: "advanced-video",
    title: "Advanced Video Processing",
    description: "Professional video editing and processing capabilities",
    category: "core",
    priority: "medium",
    status: "planned",
    progress: 0,
    timeline: "Q4 2025 - Planning",
    dependencies: ["ai-video-generation", "cloud-storage"],
    features: [
      "Video editing tools",
      "Effects and filters",
      "Audio processing",
      "Batch processing",
      "Export optimization",
    ],
  },
  {
    id: "marketplace",
    title: "Component Marketplace",
    description: "Community marketplace for sharing and selling generated components",
    category: "collaboration",
    priority: "low",
    status: "planned",
    progress: 0,
    timeline: "Q4 2025 - Research",
    dependencies: ["user-accounts", "collaboration-basic"],
    features: [
      "Component sharing",
      "Rating and reviews",
      "Monetization options",
      "Quality curation",
      "License management",
    ],
  },

  // 2026 - Legacy Vision
  {
    id: "ai-dyes",
    title: "Personal AI Dyes",
    description: "Adaptive AI that learns from user behavior and preferences",
    category: "legacy",
    priority: "medium",
    status: "research",
    progress: 5,
    timeline: "2026 - Research Phase",
    dependencies: ["user-accounts", "advanced-analytics"],
    features: [
      "Behavioral learning",
      "Personalized suggestions",
      "Style adaptation",
      "Creative evolution",
      "Legacy preservation",
    ],
  },
  {
    id: "immersive-tech",
    title: "Immersive Technology",
    description: "VR/AR integration and holographic displays",
    category: "legacy",
    priority: "low",
    status: "research",
    progress: 0,
    timeline: "2026+ - Vision",
    dependencies: ["ai-dyes", "advanced-collaboration"],
    features: [
      "VR/AR interfaces",
      "Spatial computing",
      "Holographic displays",
      "Gesture controls",
      "Immersive creation",
    ],
  },
  {
    id: "blockchain-legacy",
    title: "Blockchain Legacy System",
    description: "Decentralized storage for thousand-year preservation",
    category: "legacy",
    priority: "low",
    status: "research",
    progress: 0,
    timeline: "2026+ - Vision",
    features: [
      "Decentralized storage",
      "Immutable records",
      "Cross-generational access",
      "Legacy contracts",
      "Preservation protocols",
    ],
  },
]

const categoryColors = {
  core: "bg-blue-500",
  ai: "bg-purple-500",
  collaboration: "bg-green-500",
  infrastructure: "bg-orange-500",
  legacy: "bg-pink-500",
}

const categoryIcons = {
  core: Code,
  ai: Brain,
  collaboration: Users,
  infrastructure: Shield,
  legacy: Star,
}

const statusColors = {
  completed: "border-green-500 text-green-400",
  "in-progress": "border-blue-500 text-blue-400",
  planned: "border-yellow-500 text-yellow-400",
  research: "border-purple-500 text-purple-400",
}

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTimeline, setSelectedTimeline] = useState<string>("all")

  const categories = ["all", "core", "ai", "collaboration", "infrastructure", "legacy"]
  const timelines = ["all", "Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "2026+"]

  const filteredItems = roadmapData.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory
    const timelineMatch = selectedTimeline === "all" || item.timeline.includes(selectedTimeline)
    return categoryMatch && timelineMatch
  })

  const getOverallProgress = () => {
    const totalItems = roadmapData.length
    const completedItems = roadmapData.filter((item) => item.status === "completed").length
    const inProgressItems = roadmapData.filter((item) => item.status === "in-progress").length
    return Math.round(((completedItems + inProgressItems * 0.5) / totalItems) * 100)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <Rocket className="mr-3 h-8 w-8 text-purple-400" />
              The Ineffable Roadmap
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Our journey from creative AI tools to transcendent legacy preservation
            </p>

            {/* Overall Progress */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Overall Progress</span>
                <span className="text-sm text-purple-400 font-semibold">{getOverallProgress()}%</span>
              </div>
              <Progress value={getOverallProgress()} className="bg-gray-700" />
            </div>

            {/* Technical Specs Link */}
            <Link href="/roadmap/specs">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <FileText className="mr-2 h-4 w-4" />
                View Technical Specifications
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-300 flex items-center">
                <Target className="mr-2 h-4 w-4" />
                Category:
              </span>
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
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-300 flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Timeline:
              </span>
              {timelines.map((timeline) => (
                <Button
                  key={timeline}
                  variant={selectedTimeline === timeline ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeline(timeline)}
                  className={
                    selectedTimeline === timeline
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  }
                >
                  {timeline}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Overview */}
        <div className="mb-12">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
                Development Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Q1 2025</h3>
                  <p className="text-sm text-gray-300">Foundation Complete</p>
                  <p className="text-xs text-green-400 mt-1">✓ Core features live</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Q2 2025</h3>
                  <p className="text-sm text-gray-300">AI Integration</p>
                  <p className="text-xs text-blue-400 mt-1">🔄 Real AI services</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Q3 2025</h3>
                  <p className="text-sm text-gray-300">Cloud & Collaboration</p>
                  <p className="text-xs text-orange-400 mt-1">📅 User accounts & sync</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">2026+</h3>
                  <p className="text-sm text-gray-300">Legacy Vision</p>
                  <p className="text-xs text-purple-400 mt-1">🔮 Future technologies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roadmap Items */}
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredItems.map((item) => {
            const CategoryIcon = categoryIcons[item.category]

            return (
              <Card
                key={item.id}
                className={`bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all ${
                  item.status === "completed" ? "ring-1 ring-green-500/30" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${categoryColors[item.category]} rounded-lg flex items-center justify-center`}
                      >
                        <CategoryIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={statusColors[item.status]}>
                            {item.status.replace("-", " ")}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`border-${item.priority === "high" ? "red" : item.priority === "medium" ? "yellow" : "gray"}-500 text-${item.priority === "high" ? "red" : item.priority === "medium" ? "yellow" : "gray"}-400`}
                          >
                            {item.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.timeline}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-300 mb-4">{item.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm text-purple-400 font-semibold">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="bg-gray-700" />
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Key Features:</h4>
                    <div className="space-y-1">
                      {item.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dependencies */}
                  {item.dependencies && item.dependencies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                        <GitBranch className="h-4 w-4 mr-1" />
                        Dependencies:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {item.dependencies.map((dep) => (
                          <Badge key={dep} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                            {roadmapData.find((r) => r.id === dep)?.title || dep}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/50 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Join Our Journey</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                The Ineffable is evolving rapidly. Follow our progress, provide feedback, and help shape the future of
                AI-powered creativity.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Try Current Features
                </Button>
                <Link href="/roadmap/specs">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Technical Specs
                  </Button>
                </Link>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                  Provide Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
