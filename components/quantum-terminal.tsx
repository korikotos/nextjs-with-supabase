"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useMobile } from "@/hooks/use-mobile"
import SqyloomBrowser from "./sqyloom-browser"
import WebBrowserAddon from "./web-browser-addon"
import {
  LucideTerminal,
  LucideCode,
  LucideShare2,
  LucidePlus,
  LucideSettings,
  LucideZap,
  LucideDatabase,
  LucideMessageSquare,
  LucideBrain,
  LucideGlobe,
} from "lucide-react"

// Types for our blocks and terminal
type BlockType = "concept" | "simulation" | "code" | "chat"

interface Block {
  id: string
  type: BlockType
  title: string
  content: Record<string, unknown>
  timestamp: Date
}

interface TerminalLine {
  text: string
  type: "input" | "output" | "system" | "ai"
  timestamp: Date
}

export default function QuantumTerminal() {
  const [activeTab, setActiveTab] = useState("terminal")
  const [blocks, setBlocks] = useState<Block[]>([])
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    {
      text: "Quantum Holography Terminal v1.0.0 initialized",
      type: "system",
      timestamp: new Date(),
    },
    {
      text: 'Type "help" for available commands',
      type: "system",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const [activeTool, setActiveTool] = useState<string | null>(null)

  // Scroll to bottom of terminal when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  // Load blocks from local storage on mount
  useEffect(() => {
    const savedBlocks = localStorage.getItem("quantum-blocks")
    if (savedBlocks) {
      try {
        const parsedBlocks = JSON.parse(savedBlocks)
        // Convert string dates back to Date objects
        const blocksWithDates = parsedBlocks.map((block: any) => ({
          ...block,
          timestamp: new Date(block.timestamp),
        }))
        setBlocks(blocksWithDates)
      } catch (e) {
        console.error("Failed to parse saved blocks", e)
      }
    }
  }, [])

  // Save blocks to local storage when they change
  useEffect(() => {
    localStorage.setItem("quantum-blocks", JSON.stringify(blocks))
  }, [blocks])

  // Handle terminal input
  const handleTerminalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user input to terminal
    const newLine: TerminalLine = {
      text: inputValue,
      type: "input",
      timestamp: new Date(),
    }

    setTerminalLines((prev) => [...prev, newLine])
    setIsProcessing(true)

    // Process commands
    if (inputValue.toLowerCase() === "help") {
      processHelpCommand()
    } else if (inputValue.toLowerCase().startsWith("create ")) {
      processCreateCommand(inputValue)
    } else if (inputValue.toLowerCase().startsWith("list")) {
      processListCommand()
    } else if (inputValue.toLowerCase().startsWith("clear")) {
      setTerminalLines([])
    } else {
      // Process as AI chat
      await processAIChat(inputValue)
    }

    setInputValue("")
    setIsProcessing(false)
  }

  // Process help command
  const processHelpCommand = () => {
    const helpLines: TerminalLine[] = [
      {
        text: "Available commands:",
        type: "system",
        timestamp: new Date(),
      },
      {
        text: "help - Show this help message",
        type: "system",
        timestamp: new Date(),
      },
      {
        text: "create [type] [title] - Create a new block (types: concept, simulation, code, chat)",
        type: "system",
        timestamp: new Date(),
      },
      {
        text: "list - List all blocks",
        type: "system",
        timestamp: new Date(),
      },
      {
        text: "clear - Clear terminal",
        type: "system",
        timestamp: new Date(),
      },
    ]

    setTerminalLines((prev) => [...prev, ...helpLines])
  }

  // Process create command
  const processCreateCommand = (input: string) => {
    const parts = input.split(" ")
    if (parts.length < 3) {
      setTerminalLines((prev) => [
        ...prev,
        {
          text: "Error: Invalid create command. Format: create [type] [title]",
          type: "system",
          timestamp: new Date(),
        },
      ])
      return
    }

    const type = parts[1].toLowerCase() as BlockType
    const title = parts.slice(2).join(" ")

    if (!["concept", "simulation", "code", "chat"].includes(type)) {
      setTerminalLines((prev) => [
        ...prev,
        {
          text: "Error: Invalid block type. Valid types: concept, simulation, code, chat",
          type: "system",
          timestamp: new Date(),
        },
      ])
      return
    }

    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      title,
      content: {},
      timestamp: new Date(),
    }

    setBlocks((prev) => [...prev, newBlock])

    setTerminalLines((prev) => [
      ...prev,
      {
        text: `Created new ${type} block: ${title}`,
        type: "system",
        timestamp: new Date(),
      },
    ])

    // Switch to blocks tab
    setActiveTab("blocks")
  }

  // Process list command
  const processListCommand = () => {
    if (blocks.length === 0) {
      setTerminalLines((prev) => [
        ...prev,
        {
          text: "No blocks found",
          type: "system",
          timestamp: new Date(),
        },
      ])
      return
    }

    const listLines: TerminalLine[] = [
      {
        text: "Blocks:",
        type: "system",
        timestamp: new Date(),
      },
      ...blocks.map((block) => ({
        text: `[${block.type}] ${block.title} (${block.timestamp.toLocaleString()})`,
        type: "system" as const,
        timestamp: new Date(),
      })),
    ]

    setTerminalLines((prev) => [...prev, ...listLines])
  }

  // Process AI chat
  const processAIChat = async (input: string) => {
    // Simulate AI response
    setTerminalLines((prev) => [
      ...prev,
      {
        text: "Processing query...",
        type: "system",
        timestamp: new Date(),
      },
    ])

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Add AI response
    setTerminalLines((prev) => [
      ...prev,
      {
        text: `I'm simulating an AI response to: "${input}". In a real implementation, this would connect to the Gemini API.`,
        type: "ai",
        timestamp: new Date(),
      },
    ])
  }

  // Generate shareable URL for a block
  const generateShareableUrl = (blockId: string) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    return `${baseUrl}/concept/${blockId}`
  }

  // Copy URL to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTerminalLines((prev) => [
          ...prev,
          {
            text: "URL copied to clipboard",
            type: "system",
            timestamp: new Date(),
          },
        ])
      })
      .catch((err) => {
        setTerminalLines((prev) => [
          ...prev,
          {
            text: `Failed to copy URL: ${err}`,
            type: "system",
            timestamp: new Date(),
          },
        ])
      })
  }

  // Delete a block
  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id))
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Header */}
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideTerminal className="h-6 w-6 text-primary quantum-glow" />
          <h1 className="text-2xl font-bold quantum-text">Quantum Holography Terminal</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="quantum-border">
            v1.0.0
          </Badge>
          <Button variant="ghost" size="icon" className="quantum-glow">
            <LucideSettings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Interface */}
      <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-[2fr_1fr] gap-6"} h-[calc(100vh-120px)]`}>
        {/* Left Panel - Terminal/Blocks */}
        <Card className="quantum-panel overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="p-1 bg-muted/20">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="terminal" className="data-[state=active]:quantum-glow">
                  <LucideTerminal className="mr-2 h-4 w-4" />
                  Terminal
                </TabsTrigger>
                <TabsTrigger value="blocks" className="data-[state=active]:quantum-glow">
                  <LucideCode className="mr-2 h-4 w-4" />
                  Blocks
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Terminal Tab */}
            <TabsContent value="terminal" className="flex-1 flex flex-col p-0 m-0 h-full">
              <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto bg-background/50 terminal-text">
                {terminalLines.map((line, index) => (
                  <div
                    key={`${line.timestamp.getTime()}-${index}`}
                    className={`mb-2 ${
                      line.type === "input"
                        ? "text-secondary"
                        : line.type === "system"
                          ? "text-muted-foreground"
                          : line.type === "ai"
                            ? "text-primary"
                            : ""
                    }`}
                  >
                    {line.type === "input" && <span className="mr-2">{">"}</span>}
                    {line.type === "system" && <span className="mr-2">{"#"}</span>}
                    {line.type === "ai" && <span className="mr-2">{"AI:"}</span>}
                    {line.text}
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex gap-1 mt-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                )}
              </div>
              <form onSubmit={handleTerminalSubmit} className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter command or message..."
                    className="terminal-text bg-background/50"
                    disabled={isProcessing}
                  />
                  <Button type="submit" disabled={isProcessing} className="quantum-glow">
                    Send
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Blocks Tab */}
            <TabsContent value="blocks" className="flex-1 p-4 m-0 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold quantum-text">Quantum Blocks</h2>
                <Button size="sm" className="quantum-glow">
                  <LucidePlus className="mr-2 h-4 w-4" />
                  New Block
                </Button>
              </div>

              {blocks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No blocks created yet</p>
                  <p className="text-sm mt-2">Use the terminal to create blocks with the "create" command</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {blocks.map((block) => (
                    <Card key={block.id} className="quantum-border hologram">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <Badge
                            variant={
                              block.type === "concept"
                                ? "default"
                                : block.type === "simulation"
                                  ? "secondary"
                                  : block.type === "code"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {block.type}
                          </Badge>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                const url = generateShareableUrl(block.id)
                                copyToClipboard(url)
                              }}
                            >
                              <LucideShare2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => deleteBlock(block.id)}
                            >
                              <span className="sr-only">Delete</span>
                              &times;
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-bold">{block.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{block.timestamp.toLocaleString()}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>

        {/* Right Panel - Tools */}
        {!isMobile && (
          <Card className="quantum-panel overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold quantum-text">Quantum Tools</h2>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
              {activeTool === "sqyloom" ? (
                <SqyloomBrowser />
              ) : activeTool === "browser" ? (
                <WebBrowserAddon />
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <Card className="quantum-border">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <LucideBrain className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">SQYLOOM Browser</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        AI-powered neural navigation with adaptive interface
                      </p>
                      <Button size="sm" className="mt-3 w-full quantum-glow" onClick={() => setActiveTool("sqyloom")}>
                        Launch
                      </Button>
                    </div>
                  </Card>

                  <Card className="quantum-border">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <LucideGlobe className="h-5 w-5 text-secondary" />
                        <h3 className="font-semibold">Quantum Browser</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Enhanced web browsing with quantum interface</p>
                      <Button size="sm" className="mt-3 w-full" onClick={() => setActiveTool("browser")}>
                        Launch
                      </Button>
                    </div>
                  </Card>

                  <Card className="quantum-border">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <LucideZap className="h-5 w-5 text-secondary" />
                        <h3 className="font-semibold">Quantum Simulator</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Simulate quantum algorithms and visualize results</p>
                      <Button size="sm" className="mt-3 w-full">
                        Launch
                      </Button>
                    </div>
                  </Card>

                  <Card className="quantum-border">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <LucideDatabase className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Data Visualizer</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Create holographic visualizations of complex datasets
                      </p>
                      <Button size="sm" className="mt-3 w-full">
                        Launch
                      </Button>
                    </div>
                  </Card>

                  <Card className="quantum-border">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <LucideMessageSquare className="h-5 w-5 text-accent" />
                        <h3 className="font-semibold">AI Assistant</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Advanced AI assistant powered by Gemini</p>
                      <Button size="sm" className="mt-3 w-full">
                        Connect
                      </Button>
                    </div>
                  </Card>

                  <Separator className="my-2" />

                  <div className="text-center text-sm text-muted-foreground">
                    <p>Addon Modules Available: 7</p>
                    <Button variant="link" size="sm" className="mt-1">
                      Browse Module Store
                    </Button>
                  </div>

                  {activeTool && (
                    <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => setActiveTool(null)}>
                      Back to Tools
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
