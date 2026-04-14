"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Sparkles } from "lucide-react"

interface GeneratedComponentProps {
  type: string
  prompt: string
}

export default function GeneratedComponent({ type, prompt }: GeneratedComponentProps) {
  switch (type) {
    case "button":
      return (
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
          {prompt || "Generated Button"}
          {prompt.includes("icon") && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      )

    case "card":
      return (
        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">{prompt || "Generated Card"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">This is a dynamically generated card component with futuristic styling.</p>
          </CardContent>
        </Card>
      )

    case "form":
      return (
        <form className="space-y-4 p-6 bg-gray-800/50 rounded-lg backdrop-blur-sm">
          <div>
            <Label htmlFor="input" className="text-white">
              {prompt || "Generated Input"}
            </Label>
            <Input id="input" className="bg-gray-900/50 border-gray-600 text-white" placeholder="Enter your input..." />
          </div>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">Submit</Button>
        </form>
      )

    default:
      return (
        <div className="flex items-center justify-center p-8 text-gray-400">
          <Sparkles className="mr-2 h-5 w-5" />
          Generate a component to see the preview
        </div>
      )
  }
}
