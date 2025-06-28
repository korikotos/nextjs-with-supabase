"use client"

import React from "react"
import { Upload, Download, Play, Pause, Video, Wand2, Sparkles, Film, FileVideo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function VideosPage() {
  const [prompt, setPrompt] = React.useState("")
  const [videoUrl, setVideoUrl] = React.useState("")
  const [uploadedVideo, setUploadedVideo] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  // === State for Animated Greeting ===
  const [fullGreeting, setFullGreeting] = React.useState("")
  const [displayedWords, setDisplayedWords] = React.useState<string[]>([])

  React.useEffect(() => {
    const currentHour = new Date().getHours()
    let mood = "neutral"
    const userName = "Creator"

    if (currentHour < 6) mood = "dreamy"
    else if (currentHour < 12) mood = "energized"
    else if (currentHour < 18) mood = "focused"
    else mood = "reflective"

    const greetingStyles = {
      dreamy: `🌙 The cosmos awaits your moving visions, ${userName}. What stories shall we animate?`,
      energized: `⚡ Time flows through your creativity, ${userName}. Let's craft cinematic magic!`,
      focused: `🎬 Reality bends to your will, ${userName}. Let's sculpt time itself.`,
      reflective: `✨ The universe listens to your tales, ${userName}. What motion shall we weave?`,
    }

    setFullGreeting(greetingStyles[mood as keyof typeof greetingStyles])
  }, [])

  React.useEffect(() => {
    if (fullGreeting) {
      const words = fullGreeting.split(" ")
      setDisplayedWords([])
      const timeouts: NodeJS.Timeout[] = []

      words.forEach((word, index) => {
        const timeoutId = setTimeout(() => {
          setDisplayedWords((prevWords) => [...prevWords, word])
        }, index * 350)
        timeouts.push(timeoutId)
      })

      return () => {
        timeouts.forEach(clearTimeout)
      }
    }
  }, [fullGreeting])

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setUploadProgress(0)
      setLoading(true)

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setLoading(false)
            const url = URL.createObjectURL(file)
            setUploadedVideo(url)
            return 100
          }
          return prev + 10
        })
      }, 200)
    } else {
      setError("Please select a valid video file")
    }
  }

  // Generate AI video
  const generateVideo = React.useCallback(async () => {
    if (!prompt) {
      setError("Please enter a prompt.")
      return
    }

    setLoading(true)
    setError(null)
    setVideoUrl("")

    try {
      // Simulate AI video generation
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // For demo, use the provided sample video
      setVideoUrl("/videos/sample-video.mp4")
    } catch (err) {
      console.error("Error during video generation:", err)
      setError("An error occurred while generating the video.")
    } finally {
      setLoading(false)
    }
  }, [prompt])

  // Video controls
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Download video
  const downloadVideo = (url: string, filename: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = `${filename.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Save to portfolio
  const saveToPortfolio = (url: string, prompt: string, type: "uploaded" | "generated") => {
    const video = {
      id: Date.now(),
      url,
      prompt: prompt || "Uploaded Video",
      createdAt: new Date().toISOString(),
      type: "video",
      subType: type,
    }

    const existingPortfolio = JSON.parse(localStorage.getItem("ineffable-portfolio") || "[]")
    existingPortfolio.push(video)
    localStorage.setItem("ineffable-portfolio", JSON.stringify(existingPortfolio))

    alert("Video saved to your portfolio!")
  }

  const currentVideo = videoUrl || uploadedVideo

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-2">
                Video Creator
              </h1>
              <p className="text-gray-300">Transcendent video creation and transformation within The Ineffable</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-purple-500 text-purple-400">
                <Film className="mr-1 h-3 w-3" />
                AI Powered
              </Badge>
              <Badge variant="outline" className="border-pink-500 text-pink-400">
                <Video className="mr-1 h-3 w-3" />
                Creative
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Animated Greeting */}
        <div className="text-center mb-12">
          <div className="h-16 flex items-center justify-center">
            <div className="text-2xl font-bold text-amber-400">
              {displayedWords.map((word, index) => (
                <span
                  key={index}
                  className="inline-block mr-2 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Side: Video Upload & Generation */}
          <div className="space-y-6">
            {/* Upload Section */}
            <Card className="bg-gradient-to-br from-blue-900/70 to-cyan-900/70 border-blue-400 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-cyan-300 flex items-center justify-center">
                  <Upload className="mr-3 h-6 w-6" />
                  Upload Video
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-cyan-400/50 rounded-lg p-8 text-center hover:border-cyan-400 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <FileVideo className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                    <p className="text-cyan-300 font-semibold mb-2">Click to upload video</p>
                    <p className="text-gray-400 text-sm">MP4, MOV, AVI up to 100MB</p>
                  </label>
                </div>

                {loading && uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-cyan-300">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="bg-gray-700" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Generation Section */}
            <Card className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 border-purple-400 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-pink-300 flex items-center justify-center">
                  <Wand2 className="mr-3 h-6 w-6" />
                  AI Video Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Describe your video vision</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the video you want to create... (e.g., 'A time-lapse of a mystical forest transforming through seasons')"
                    className="bg-black/60 border-pink-500/70 text-slate-100 placeholder-slate-300 focus:border-pink-400 focus:ring-pink-400 min-h-[100px]"
                    disabled={loading}
                  />
                </div>

                <Button
                  onClick={generateVideo}
                  disabled={loading || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 text-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating Video...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Video
                    </>
                  )}
                </Button>

                {error && (
                  <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg">
                    <p className="text-red-300 text-center">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Video Preview & Actions */}
          <Card className="bg-gradient-to-br from-gray-900/70 to-black/70 border-gray-600 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-white">Video Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {currentVideo ? (
                <div className="space-y-6">
                  <div className="relative group">
                    <video
                      ref={videoRef}
                      src={currentVideo}
                      className="w-full h-auto rounded-lg border-2 border-gray-600 shadow-2xl"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      controls
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"></div>
                  </div>

                  {/* Video Controls */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      onClick={togglePlayPause}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="border-blue-400 text-blue-300 hover:bg-blue-400/10 bg-transparent"
                        onClick={() => downloadVideo(currentVideo, prompt || "video")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        className="border-purple-400 text-purple-300 hover:bg-purple-400/10 bg-transparent"
                        onClick={() =>
                          saveToPortfolio(currentVideo, prompt || "Uploaded Video", videoUrl ? "generated" : "uploaded")
                        }
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Save to Portfolio
                      </Button>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={() => (window.location.href = "/portfolio")}
                    >
                      View Portfolio
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 flex items-center justify-center mb-6">
                    <Video className="h-12 w-12 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No video loaded</h3>
                  <p className="text-gray-500">Upload a video or generate one with AI to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Video Gallery */}
        <div className="mt-16">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">Recent Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample video preview */}
                <div className="relative group">
                  <video
                    src="/videos/sample-video.mp4"
                    className="w-full h-48 object-cover rounded-lg border border-gray-600"
                    muted
                    loop
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-semibold truncate">Sample Video</p>
                  </div>
                </div>

                {/* Placeholder slots */}
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-48 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg border border-gray-600 flex items-center justify-center"
                  >
                    <Video className="h-12 w-12 text-gray-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
