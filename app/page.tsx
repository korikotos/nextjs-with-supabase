import Link from "next/link"
import { ArrowRight, Brain, Users, CuboidIcon as Cube, Shield, Globe } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import HeroAnimation from "@/components/hero-animation"
import TimelineSection from "@/components/timeline-section"
import TestimonialSection from "@/components/testimonial-section"
import VideoShowcase from "@/components/video-showcase"
import AppAboutSection from "@/components/app-about-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-black py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <HeroAnimation />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl">
            The Ineffable
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            A timeless bridge between generations, preserving your essence through cutting-edge AI and immersive
            technology.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/experience"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700"
            >
              Experience The Ineffable
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/learn-more"
              className="inline-flex items-center rounded-full border border-gray-700 bg-black/50 px-6 py-3 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-black/70"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <VideoShowcase />

      {/* Transparent About Section */}
      <AppAboutSection />

      {/* Features Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-4xl font-bold text-white mb-16">
            Transcending the Boundaries of Time and Space
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-purple-400" />}
              title="Personal AI Dyes"
              description="Adaptive AI that evolves with you, collecting and organizing your data to serve as your digital twin for future generations."
            />

            <FeatureCard
              icon={<Users className="h-10 w-10 text-blue-400" />}
              title="Collaborative System"
              description="Multi-user puzzles, real-time synchronization, and shared achievements creating dynamic interactive experiences."
            />

            <FeatureCard
              icon={<Cube className="h-10 w-10 text-pink-400" />}
              title="Immersive Technology"
              description="Holographic and VR capabilities with spatial audio, lifelike visuals, and mood-responsive interactive environments."
            />

            <FeatureCard
              icon={<Shield className="h-10 w-10 text-emerald-400" />}
              title="Legacy Preservation"
              description="Secure, AI-driven system that stores knowledge and multimedia for centuries using advanced blockchain technology."
            />

            <FeatureCard
              icon={<Globe className="h-10 w-10 text-amber-400" />}
              title="Multilingual Support"
              description="Advanced real-time translation enabling seamless communication across languages and cultures."
            />

            <FeatureCard
              icon={<ArrowRight className="h-10 w-10 text-red-400" />}
              title="Interactive Storytelling"
              description="AI-guided narratives with dynamic achievement systems and hidden discoveries to enhance engagement."
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* React Bits Generator Section */}
      <section className="bg-gradient-to-b from-gray-900 to-black py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-4xl font-bold text-white mb-6">React Bits Generator</h2>
          <p className="text-center text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Harness the power of The Ineffable to generate React components that transcend ordinary development. Create,
            customize, and preserve your code legacy.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
            <Link href="/generator/components" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-purple-900/30 p-6 backdrop-blur-sm transition-all hover:bg-purple-900/50">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-600/20 blur-3xl transition-all group-hover:bg-purple-600/30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
                    <span className="text-white font-bold">{"</>"}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">UI Components</h3>
                  <p className="text-gray-300 text-sm">Generate buttons, cards, forms, and more</p>
                </div>
              </div>
            </Link>

            <Link href="/generator/layouts" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-blue-900/30 p-6 backdrop-blur-sm transition-all hover:bg-blue-900/50">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl transition-all group-hover:bg-blue-600/30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <span className="text-white font-bold">⚏</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Layouts</h3>
                  <p className="text-gray-300 text-sm">Create responsive page layouts</p>
                </div>
              </div>
            </Link>

            <Link href="/generator/animations" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-pink-900/30 p-6 backdrop-blur-sm transition-all hover:bg-pink-900/50">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-600/20 blur-3xl transition-all group-hover:bg-pink-600/30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-600">
                    <span className="text-white font-bold">✨</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Animations</h3>
                  <p className="text-gray-300 text-sm">Add motion and life to components</p>
                </div>
              </div>
            </Link>

            <Link href="/generator/hooks" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-emerald-900/30 p-6 backdrop-blur-sm transition-all hover:bg-emerald-900/50">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-600/20 blur-3xl transition-all group-hover:bg-emerald-600/30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600">
                    <span className="text-white font-bold">⚡</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Custom Hooks</h3>
                  <p className="text-gray-300 text-sm">Generate reusable React hooks</p>
                </div>
              </div>
            </Link>

            <Link href="/generator/ai-images" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-amber-900/30 p-6 backdrop-blur-sm transition-all hover:bg-amber-900/50">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-600/20 blur-3xl transition-all group-hover:bg-amber-600/30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-600">
                    <span className="text-white font-bold">🎨</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">AI Image Generator</h3>
                  <p className="text-gray-300 text-sm">Create stunning visuals with AI</p>
                </div>
              </div>
            </Link>

            <Link href="/generator/videos" className="group">
              <div className="relative overflow-hidden rounded-2xl bg-red-900/30 p-6 backdrop-blur-sm transition-all hover:bg-red-900/50">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-600/20 blur-3xl transition-all group-hover:bg-red-600/30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
                    <span className="text-white font-bold">🎬</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Video Creator</h3>
                  <p className="text-gray-300 text-sm">Upload and generate videos with AI</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/generator"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700"
            >
              Launch Generator
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Begin Your Timeless Journey</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 mb-10">
            Join us in creating a legacy that transcends generations. The Ineffable is not just a tool, but a living,
            evolving entity ensuring your essence lasts for a thousand years and beyond.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700"
          >
            Reserve Your Digital Legacy
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
