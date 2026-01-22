"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LucideShield, LucideCrown, LucideKey, LucideGlobe } from "lucide-react"
import { sqyloomAPI } from "@/services/sqyloom-api"
import { getDomainConfig } from "@/config/domain-empire"

interface AuthContextType {
  user: any | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  currentDomain: string
}

const AuthContext = createContext<AuthContextType | null>(null)

export function SQYLOOMAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [currentDomain, setCurrentDomain] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentDomain(window.location.hostname)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const result = await sqyloomAPI.authenticate(email, password)
    if (result.success && result.data) {
      setUser(result.data)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sqyloom_token")
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    currentDomain,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useSQYLOOMAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useSQYLOOMAuth must be used within SQYLOOMAuthProvider")
  }
  return context
}

export function SQYLOOMLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, currentDomain } = useSQYLOOMAuth()
  const domainConfig = getDomainConfig(currentDomain)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await login(email, password)

    if (!success) {
      setError("Invalid credentials")
    }

    setIsLoading(false)
  }

  return (
    <Card className="quantum-border w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center">
          <LucideCrown className="h-6 w-6 text-primary quantum-glow" />
          <span className="quantum-text">SQYLOOM Empire Access</span>
        </CardTitle>
        <div className="text-center">
          <Badge variant="outline" className="quantum-border">
            <LucideGlobe className="mr-1 h-3 w-3" />
            {domainConfig.domain}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <LucideKey className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your royal email..."
              className="pl-8 quantum-border"
              required
            />
          </div>

          <div className="relative">
            <LucideShield className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Quantum password..."
              className="pl-8 quantum-border"
              required
            />
          </div>

          {error && <div className="text-center text-sm text-destructive">{error}</div>}

          <Button type="submit" className="w-full quantum-glow" disabled={isLoading}>
            {isLoading ? (
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            ) : (
              <>
                <LucideCrown className="mr-2 h-4 w-4" />
                Enter SQYLOOM Empire
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-xs text-muted-foreground">
          <p>Access granted across all SQYLOOM domains</p>
          <p className="quantum-text mt-1">Your dream project awaits! 👑</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function SQYLOOMUserProfile() {
  const { user, logout, currentDomain } = useSQYLOOMAuth()

  if (!user) return null

  return (
    <Card className="quantum-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LucideCrown className="h-5 w-5 text-primary quantum-glow" />
            <div>
              <div className="font-medium">{user.email}</div>
              <div className="text-xs text-muted-foreground">SQYLOOM Empire Member</div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
        <div className="mt-2 flex gap-1">
          {user.domains?.map((domain: string) => (
            <Badge key={domain} variant="outline" className="text-xs">
              {domain}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
