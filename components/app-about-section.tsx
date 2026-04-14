import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, Zap, Code, Palette, Video, Users, Shield } from "lucide-react"

export default function AppAboutSection() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-24">
      <div className="container mx-auto px-4">
        {/* Transparent About Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Info className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-4xl font-bold text-white">What is The Ineffable?</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <p className="text-xl text-blue-100 leading-relaxed mb-6">
                <strong>The Ineffable</strong> is a creative AI platform that combines multiple tools into one unified
                experience. Think of it as your personal creative studio powered by artificial intelligence.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">🎯 What You Can Actually Do:</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• Generate React components with AI assistance</li>
                    <li>• Create AI-powered images and artwork</li>
                    <li>• Upload and manage video content</li>
                    <li>• Build a personal creative portfolio</li>
                    <li>• Export your work to external platforms</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">⚡ How It Works:</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• Describe what you want in plain English</li>
                    <li>• AI generates code, images, or layouts</li>
                    <li>• Preview and customize your creations</li>
                    <li>• Download or share your work</li>
                    <li>• Build your creative legacy over time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Honest Feature Breakdown */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Code className="h-8 w-8 text-purple-400" />
                <Badge variant="outline" className="border-green-500 text-green-400">
                  Live
                </Badge>
              </div>
              <CardTitle className="text-white text-lg">React Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">
                Generate functional React components from text descriptions. Perfect for developers and designers.
              </p>
              <p className="text-xs text-gray-400">Status: ✅ Fully functional with preview and export</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Palette className="h-8 w-8 text-amber-400" />
                <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                  Demo
                </Badge>
              </div>
              <CardTitle className="text-white text-lg">AI Image Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">
                Create images from text prompts. Currently uses placeholder images for demonstration.
              </p>
              <p className="text-xs text-gray-400">Status: 🔄 Demo mode - real AI integration coming soon</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Video className="h-8 w-8 text-red-400" />
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  Beta
                </Badge>
              </div>
              <CardTitle className="text-white text-lg">Video Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">
                Upload, preview, and manage video content. Basic functionality with room for enhancement.
              </p>
              <p className="text-xs text-gray-400">Status: 🔧 Beta - upload and preview working</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-green-400" />
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  Concept
                </Badge>
              </div>
              <CardTitle className="text-white text-lg">Legacy System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">
                The "thousand year legacy" concept is our long-term vision for digital preservation.
              </p>
              <p className="text-xs text-gray-400">Status: 💭 Conceptual - portfolio system is the first step</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Limitations */}
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-2xl p-8 backdrop-blur-sm mb-16">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-yellow-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Current Limitations & Transparency</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">What's Working Now:</h4>
              <ul className="space-y-1 text-yellow-100 text-sm">
                <li>✅ React component generation with real code output</li>
                <li>✅ Component preview and customization</li>
                <li>✅ Portfolio management and local storage</li>
                <li>✅ Video upload and basic playback</li>
                <li>✅ Export functionality for external use</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">In Development:</h4>
              <ul className="space-y-1 text-yellow-100 text-sm">
                <li>🔄 Real AI image generation (currently placeholder)</li>
                <li>🔄 Advanced video processing and AI generation</li>
                <li>🔄 Cloud storage and synchronization</li>
                <li>🔄 Collaborative features and sharing</li>
                <li>🔄 Advanced legacy preservation systems</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Creating?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            The Ineffable is free to use and constantly evolving. Start with our React generator or explore the AI image
            creator to see what's possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/generator"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700"
            >
              <Zap className="mr-2 h-5 w-5" />
              Try the Generator
            </a>
            <a
              href="/generator/ai-images"
              className="inline-flex items-center rounded-full border border-gray-700 bg-black/50 px-6 py-3 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-black/70"
            >
              <Palette className="mr-2 h-5 w-5" />
              Create AI Art
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
