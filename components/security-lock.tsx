"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LucideShield, LucideLock, LucideUnlock, LucideKey } from "lucide-react"

interface SecurityLockProps {
  onUnlock: () => void
}

export default function SecurityLock({ onUnlock }: SecurityLockProps) {
  const [password, setPassword] = useState("")
  const [isLocked, setIsLocked] = useState(true)
  const [attempts, setAttempts] = useState(0)

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple password check (in real implementation, use proper authentication)
    if (password === "sqyloom2024" || password === "quantum") {
      setIsLocked(false)
      onUnlock()
    } else {
      setAttempts((prev) => prev + 1)
      setPassword("")
    }
  }

  if (!isLocked) {
    return (
      <div className="flex items-center gap-2 text-green-500">
        <LucideUnlock className="h-4 w-4" />
        <span className="text-sm">SQYLOOM Secured</span>
      </div>
    )
  }

  return (
    <Card className="quantum-border w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center">
          <LucideLock className="h-6 w-6 text-primary quantum-glow" />
          <span className="quantum-text">SQYLOOM Security Lock</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Badge variant="outline" className="quantum-border">
            <LucideShield className="mr-1 h-3 w-3" />
            Quantum Encrypted
          </Badge>
        </div>

        <form onSubmit={handleUnlock} className="space-y-3">
          <div className="relative">
            <LucideKey className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter quantum key..."
              className="pl-8 quantum-border"
            />
          </div>

          <Button type="submit" className="w-full quantum-glow">
            <LucideUnlock className="mr-2 h-4 w-4" />
            Unlock SQYLOOM
          </Button>
        </form>

        {attempts > 0 && (
          <div className="text-center text-sm text-destructive">Invalid quantum key. Attempts: {attempts}/3</div>
        )}

        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 Quick Jet Services by hichammneimne.com</p>
          <p>www.sqyloom.uk | Architects Vercel</p>
        </div>
      </CardContent>
    </Card>
  )
}
