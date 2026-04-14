"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Code, Palette, Layout, Sparkles, Menu, X, FolderOpen, Video, Rocket, FileText } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Generator", href: "/generator", icon: Code },
  { name: "Components", href: "/generator/components", icon: Layout },
  { name: "AI Images", href: "/generator/ai-images", icon: Palette },
  { name: "Videos", href: "/generator/videos", icon: Video },
  { name: "Portfolio", href: "/portfolio", icon: FolderOpen },
  { name: "Roadmap", href: "/roadmap", icon: Rocket },
  { name: "Tech Specs", href: "/roadmap/specs", icon: FileText },
  { name: "Layouts", href: "/generator/layouts", icon: Sparkles },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black/80 border-gray-700 text-white backdrop-blur-sm"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-4 left-4 z-40 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="bg-black/80 backdrop-blur-sm border border-gray-700 rounded-lg p-2">
          <div className="flex flex-col gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-blue-600"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
