"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideCrown, LucideMapPin, PoundSterlingIcon as LucidePound, LucideShield } from "lucide-react"
import { SQYLOOMLoginForm, useSQYLOOMAuth } from "@/components/sqyloom-auth"
import QuantumTerminal from "@/components/quantum-terminal"

export default function UKLandingPage() {
  const { isAuthenticated } = useSQYLOOMAuth()

  if (isAuthenticated) {
    return <QuantumTerminal />
  }

  return (
    <div className="min-h-screen bg-background grid-pattern p-4">
      <div className="container mx-auto max-w-6xl">
        {/* UK Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <LucideCrown className="h-8 w-8 text-primary quantum-glow" />
            <h1 className="text-4xl font-bold quantum-text">SQYLOOM UK</h1>
          </div>
          <p className="text-xl text-muted-foreground">Quantum AI Solutions for the United Kingdom</p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="outline" className="quantum-border">
              <LucideMapPin className="mr-1 h-3 w-3" />
              United Kingdom
            </Badge>
            <Badge variant="outline" className="quantum-border">
              <LucidePound className="mr-1 h-3 w-3" />
              GBP Pricing
            </Badge>
            <Badge variant="outline" className="quantum-border">
              <LucideShield className="mr-1 h-3 w-3" />
              GDPR Compliant
            </Badge>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* UK Services */}
          <div className="space-y-6">
            <Card className="quantum-border hologram">
              <CardHeader>
                <CardTitle className="quantum-text">UK Business Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded quantum-border">
                    <h3 className="font-semibold">Quantum Computing Consultancy</h3>
                    <p className="text-sm text-muted-foreground">
                      Expert guidance for UK businesses entering quantum computing
                    </p>
                    <div className="text-sm text-primary mt-1">From £500/day</div>
                  </div>

                  <div className="p-3 rounded quantum-border">
                    <h3 className="font-semibold">AI Browser Integration</h3>
                    <p className="text-sm text-muted-foreground">Custom SQYLOOM browser solutions for enterprises</p>
                    <div className="text-sm text-primary mt-1">From £2,000/project</div>
                  </div>

                  <div className="p-3 rounded quantum-border">
                    <h3 className="font-semibold">Quantum Terminal Licensing</h3>
                    <p className="text-sm text-muted-foreground">
                      Enterprise licenses for the Quantum Holography Terminal
                    </p>
                    <div className="text-sm text-primary mt-1">From £100/month</div>
                  </div>
                </div>

                <Button className="w-full quantum-glow">Request UK Consultation</Button>
              </CardContent>
            </Card>

            <Card className="quantum-border">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">UK Contact Information</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>📧 uk@sqyloom.net</p>
                  <p>📞 +44 (0) 20 7946 0958</p>
                  <p>📍 London, United Kingdom</p>
                  <p>🕒 Business Hours: 9:00 AM - 6:00 PM GMT</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Login Form */}
          <div>
            <SQYLOOMLoginForm />
          </div>
        </div>

        {/* UK Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <div className="space-y-2">
            <p>© 2024 SQYLOOM UK - Quick Jet Services</p>
            <p>Registered in England & Wales | VAT: GB123456789</p>
            <p>GDPR Compliant | Data Protection Registration: ZA123456</p>
            <p className="quantum-text">Proudly serving the United Kingdom 🇬🇧</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
