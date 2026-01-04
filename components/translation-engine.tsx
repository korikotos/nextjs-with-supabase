"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Languages, Zap, Clock, Target } from "lucide-react"

interface TranslationResult {
  originalText: string
  translatedText: string
  sourceLanguage: string
  targetLanguage: string
  accuracyScore: number
  latencyMs: number
  mode: string
  accuracyMode: string
}

interface TranslationEngineProps {
  aiEnabled: boolean
}

export default function TranslationEngine({ aiEnabled }: TranslationEngineProps) {
  const [text, setText] = useState("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("es")
  const [accuracyMode, setAccuracyMode] = useState("balanced")
  const [isTranslating, setIsTranslating] = useState(false)
  const [result, setResult] = useState<TranslationResult | null>(null)
  const [metrics, setMetrics] = useState({
    totalTranslations: 0,
    avgLatency: 0,
    avgAccuracy: 0,
  })

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
  ]

  const accuracyModes = [
    { value: "high", label: "High Accuracy", description: "Best quality, slower processing" },
    { value: "balanced", label: "Balanced", description: "Good balance of speed and accuracy" },
    { value: "low", label: "Fast", description: "Quick processing, lower accuracy" },
  ]

  const mockTranslations: Record<string, Record<string, string>> = {
    "en-es": {
      hello: "hola",
      goodbye: "adiós",
      "thank you": "gracias",
      "how are you": "¿cómo estás?",
      "good morning": "buenos días",
      "good night": "buenas noches",
    },
    "en-fr": {
      hello: "bonjour",
      goodbye: "au revoir",
      "thank you": "merci",
      "how are you": "comment allez-vous",
      "good morning": "bonjour",
      "good night": "bonne nuit",
    },
    "en-de": {
      hello: "hallo",
      goodbye: "auf wiedersehen",
      "thank you": "danke",
      "how are you": "wie geht es dir",
      "good morning": "guten morgen",
      "good night": "gute nacht",
    },
  }

  const handleTranslate = async () => {
    if (!text.trim() || !aiEnabled) return

    setIsTranslating(true)

    // Simulate processing time based on accuracy mode
    const processingTimes = {
      high: 2000,
      balanced: 1200,
      low: 600,
    }

    const accuracyScores = {
      high: 0.95 + Math.random() * 0.04,
      balanced: 0.87 + Math.random() * 0.08,
      low: 0.75 + Math.random() * 0.15,
    }

    const startTime = Date.now()

    await new Promise((resolve) => setTimeout(resolve, processingTimes[accuracyMode as keyof typeof processingTimes]))

    const latency = Date.now() - startTime
    const accuracy = accuracyScores[accuracyMode as keyof typeof accuracyScores]

    // Get translation
    const translationKey = `${sourceLang}-${targetLang}`
    const translations = mockTranslations[translationKey] || {}
    const translatedText = translations[text.toLowerCase()] || `[${targetLang.toUpperCase()}] ${text}`

    const newResult: TranslationResult = {
      originalText: text,
      translatedText,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      accuracyScore: Math.round(accuracy * 1000) / 1000,
      latencyMs: latency,
      mode: "online",
      accuracyMode,
    }

    setResult(newResult)

    // Update metrics
    setMetrics((prev) => ({
      totalTranslations: prev.totalTranslations + 1,
      avgLatency: Math.round((prev.avgLatency * prev.totalTranslations + latency) / (prev.totalTranslations + 1)),
      avgAccuracy:
        Math.round(((prev.avgAccuracy * prev.totalTranslations + accuracy) / (prev.totalTranslations + 1)) * 1000) /
        1000,
    }))

    setIsTranslating(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5" />
            Advanced Translation Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Accuracy Mode Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">Accuracy Mode</label>
            <Select value={accuracyMode} onValueChange={setAccuracyMode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accuracyModes.map((mode) => (
                  <SelectItem key={mode.value} value={mode.value}>
                    <div>
                      <div className="font-medium">{mode.label}</div>
                      <div className="text-xs text-gray-500">{mode.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">From</label>
              <Select value={sourceLang} onValueChange={setSourceLang}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">To</label>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Text Input */}
          <div>
            <label className="text-sm font-medium mb-2 block">Text to translate</label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to translate..."
              disabled={!aiEnabled}
            />
          </div>

          {/* Translate Button */}
          <Button onClick={handleTranslate} disabled={!text.trim() || isTranslating || !aiEnabled} className="w-full">
            {isTranslating ? "Translating..." : "Translate"}
          </Button>

          {!aiEnabled && (
            <div className="text-center text-sm text-gray-500">
              AI is disabled. Enable AI to use translation features.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Translation Result */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Translation Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Original</label>
                <p className="text-lg">{result.originalText}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Translation</label>
                <p className="text-lg font-medium text-blue-600">{result.translatedText}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                  <div className="font-medium">{(result.accuracyScore * 100).toFixed(1)}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Latency</div>
                  <div className="font-medium">{result.latencyMs}ms</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-600" />
                <div>
                  <div className="text-sm text-gray-600">Mode</div>
                  <Badge variant="secondary">{result.accuracyMode}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics */}
      {metrics.totalTranslations > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{metrics.totalTranslations}</div>
                <div className="text-sm text-gray-600">Total Translations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{metrics.avgLatency}ms</div>
                <div className="text-sm text-gray-600">Avg Latency</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{(metrics.avgAccuracy * 100).toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Avg Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
