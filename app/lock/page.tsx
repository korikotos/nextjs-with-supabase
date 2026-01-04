"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Lock, Unlock, Shield, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LockPage() {
  const [code, setCode] = useState("")
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [error, setError] = useState("")
  const router = useRouter()

  // You can change this access code
  const ACCESS_CODE = "HICHAMMNEIMNE01"

  const handleUnlock = async () => {
    if (!code.trim()) {
      setError("Please enter access code")
      return
    }

    setIsUnlocking(true)
    setError("")

    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (code.toUpperCase() === ACCESS_CODE.toUpperCase()) {
      // Store unlock status in localStorage
      localStorage.setItem("deepseek_unlocked", "true")
      router.push("/")
    } else {
      setAttempts((prev) => prev + 1)
      setError("Invalid access code. Please try again.")
      setCode("")
    }

    setIsUnlocking(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUnlock()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white mb-2">Secure Access</CardTitle>
              <p className="text-gray-300">Enter your access code to continue</p>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Shield className="w-3 h-3 mr-1" />
              Protected Area
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Access Code Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Access Code</label>
              <div className="relative">
                <Input
                  type={showCode ? "text" : "password"}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter access code..."
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 pr-10"
                  disabled={isUnlocking}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-white"
                  onClick={() => setShowCode(!showCode)}
                >
                  {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Attempts Counter */}
            {attempts > 0 && (
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Failed attempts: {attempts}
                  {attempts >= 3 && <span className="text-yellow-400 ml-2">⚠️ Multiple failed attempts detected</span>}
                </p>
              </div>
            )}

            {/* Unlock Button */}
            <Button
              onClick={handleUnlock}
              disabled={isUnlocking || !code.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
            >
              {isUnlocking ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Unlock className="w-4 h-4" />
                  Unlock Access
                </div>
              )}
            </Button>

            {/* Security Features */}
            <div className="space-y-3 pt-4 border-t border-white/20">
              <h4 className="text-sm font-medium text-gray-300">Security Features</h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Encrypted Access
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Secure Session
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Protected Data
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Privacy First
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <div className="text-gray-400 text-sm">
            <p className="mb-2">© 2024 DeepSeek Browser. All rights reserved.</p>
            <p className="text-xs">
              Redefined by{" "}
              <a
                href="https://www.hichammneimne.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
              >
                www.hichammneimne.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
