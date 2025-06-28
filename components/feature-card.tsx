import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/70">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 blur-3xl transition-all group-hover:bg-gradient-to-br group-hover:from-purple-600/30 group-hover:to-blue-600/30"></div>

      <div className="relative z-10">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-900/70 backdrop-blur-sm">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}

