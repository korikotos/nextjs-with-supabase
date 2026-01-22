"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideGlobe, LucideShield } from "lucide-react"

export default function GlobalFooter() {
  return (
    <Card className="quantum-panel mt-4">
      <div className="p-4 text-center border-t border-border">
        <div className="flex justify-center gap-2 mb-2">
          <Badge variant="outline" className="quantum-border">
            <LucideShield className="mr-1 h-3 w-3" />
            Quantum Secured
          </Badge>
          <Badge variant="outline" className="quantum-border">
            <LucideGlobe className="mr-1 h-3 w-3" />
            SQYLOOM Network
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="quantum-text font-semibold">SQYLOOM Quantum AI Browser v1.0</p>
          <p>
            © 2024 Quick Jet Services by{" "}
            <a href="https://hichammneimne.com" className="text-primary hover:underline">
              hichammneimne.com
            </a>
          </p>
          <p>
            <a href="https://www.sqyloom.uk" className="text-secondary hover:underline">
              www.sqyloom.uk
            </a>{" "}
            | Architects Vercel
          </p>
          <p className="text-xs opacity-75">Powered by Quantum Holography Terminal</p>
        </div>
      </div>
    </Card>
  )
}
