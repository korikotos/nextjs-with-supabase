"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LucideShield,
  LucideZap,
  LucideUpload,
  LucideFileText,
  LucideImage,
  LucideVideo,
  LucideArchive,
  LucideCheck,
  LucideX,
  LucideSkull,
} from "lucide-react"

interface ProcessedFile {
  name: string
  type: string
  size: number
  status: "processing" | "completed" | "error"
  stealthTag: string
}

export default function QuantumStealthProcessor() {
  const [files, setFiles] = useState<ProcessedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <LucideImage className="h-4 w-4" />
    if (type.includes("video")) return <LucideVideo className="h-4 w-4" />
    if (type.includes("zip") || type.includes("archive")) return <LucideArchive className="h-4 w-4" />
    return <LucideFileText className="h-4 w-4" />
  }

  const processFile = async (file: File): Promise<ProcessedFile> => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/stealth-file", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        return {
          name: file.name,
          type: file.type,
          size: file.size,
          status: "completed",
          stealthTag: "Quantum Stealth Novais08",
        }
      } else {
        throw new Error("Processing failed")
      }
    } catch (error) {
      return {
        name: file.name,
        type: file.type,
        size: file.size,
        status: "error",
        stealthTag: "",
      }
    }
  }

  const handleFiles = useCallback(async (fileList: FileList) => {
    const fileArray = Array.from(fileList)
    setIsProcessing(true)
    setProgress(0)

    const initialFiles: ProcessedFile[] = fileArray.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      status: "processing" as const,
      stealthTag: "",
    }))

    setFiles(initialFiles)

    // Process files one by one
    for (let i = 0; i < fileArray.length; i++) {
      const processedFile = await processFile(fileArray[i])

      setFiles((prev) => prev.map((f, index) => (index === i ? processedFile : f)))

      setProgress(((i + 1) / fileArray.length) * 100)
    }

    setIsProcessing(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files)
      }
    },
    [handleFiles],
  )

  const clearFiles = () => {
    setFiles([])
    setProgress(0)
  }

  return (
    <div className="space-y-4">
      {/* Sonic Nuke Header */}
      <Card className="quantum-border hologram">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <LucideSkull className="h-6 w-6 text-destructive quantum-glow" />
            <span className="quantum-text">Sonic Nuke: Quantum Stealth</span>
          </CardTitle>
          <div className="flex gap-2 mt-2">
            <Badge variant="destructive" className="quantum-border">
              <LucideZap className="mr-1 h-3 w-3" />
              Novais08 Protocol
            </Badge>
            <Badge variant="outline" className="quantum-border">
              <LucideShield className="mr-1 h-3 w-3" />
              Metadata Obliterator
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Drop Zone */}
      <Card
        className={`quantum-border transition-all duration-300 ${
          dragActive ? "border-destructive bg-destructive/10" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
              <LucideUpload className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Drop Files for Stealth Processing</h3>
              <p className="text-muted-foreground">Supports: Images, Videos, Documents, Archives, and more</p>
            </div>
            <div className="flex gap-2 justify-center">
              <input type="file" multiple onChange={handleFileInput} className="hidden" id="file-upload" accept="*/*" />
              <label htmlFor="file-upload">
                <Button className="quantum-glow" disabled={isProcessing}>
                  Select Files
                </Button>
              </label>
              {files.length > 0 && (
                <Button variant="outline" onClick={clearFiles} disabled={isProcessing}>
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Progress */}
      {isProcessing && (
        <Card className="quantum-border">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sonic Nuke Processing...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="quantum-glow" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Card className="quantum-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideShield className="h-5 w-5" />
              Stealth Processing Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded quantum-border">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <div className="font-medium">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === "processing" && (
                    <div className="flex gap-1">
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
                  {file.status === "completed" && (
                    <>
                      <Badge variant="destructive" className="text-xs">
                        {file.stealthTag}
                      </Badge>
                      <LucideCheck className="h-4 w-4 text-green-500" />
                    </>
                  )}
                  {file.status === "error" && <LucideX className="h-4 w-4 text-destructive" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Stealth Info */}
      <Card className="quantum-border hologram">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-destructive">☢️ Sonic Nuke Features:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Metadata obliteration</li>
                <li>• Quantum stealth tagging</li>
                <li>• Multi-format support</li>
                <li>• Surveillance-proof processing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">🛡️ Supported Formats:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Images: JPG, PNG, GIF</li>
                <li>• Videos: MP4, MOV, AVI</li>
                <li>• Documents: PDF, DOCX, XLSX</li>
                <li>• Archives: ZIP, RAR, 7Z</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
