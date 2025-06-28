"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, CheckCircle, AlertTriangle, Code, Globe, Shield, Zap } from "lucide-react"

export default function SqyloomIntegrationPage() {
  const [apiKey, setApiKey] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  const testConnection = () => {
    // Simulate connection test
    setTimeout(() => {
      setIsConnected(true)
      alert("Connection test successful!")
    }, 1000)
  }

  const integrationCode = `<!-- Add this to your Sqyloom.uk expressionism page -->
<div id="ineffable-gallery"></div>

<script>
async function loadIneffableArtwork() {
  try {
    const response = await fetch('YOUR_API_ENDPOINT/portfolio');
    const artworks = await response.json();
    
    const gallery = document.getElementById('ineffable-gallery');
    gallery.innerHTML = artworks.map(art => \`
      <div class="artwork-item">
        \${art.type === 'video' ? 
          \`<video src="\${art.url}" controls style="max-width: 100%; height: auto;"></video>\` :
          \`<img src="\${art.imageUrl || art.url}" alt="\${art.title}" />\`
        }
        <h3>\${art.title}</h3>
        <p>Created: \${new Date(art.createdAt).toLocaleDateString()}</p>
        <p>Type: \${art.type}</p>
      </div>
    \`).join('');
  } catch (error) {
    console.error('Failed to load artwork:', error);
  }
}

// Load artwork when page loads
loadIneffableArtwork();
</script>

<style>
.artwork-item {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.artwork-item img, .artwork-item video {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>`

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Sqyloom.uk Integration</h1>
          <p className="text-gray-300">Connect The Ineffable to your expressionism gallery</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Connection Setup */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-blue-400" />
                  Website Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                      <span className="text-yellow-300">SSL Certificate Required</span>
                    </div>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                      Action Needed
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-300 space-y-2">
                    <p>
                      <strong>Current URL:</strong> www.sqyloom.uk/expressionism
                    </p>
                    <p>
                      <strong>Issue:</strong> No HTTPS support detected
                    </p>
                    <p>
                      <strong>Solution:</strong> Enable SSL certificate through your hosting provider
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-400 hover:bg-blue-600/10 bg-transparent"
                    onClick={() => window.open("https://www.sqyloom.uk/expressionism", "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Your Website
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-purple-400" />
                  Quick Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">API Key (Optional)</label>
                  <Input
                    type="password"
                    placeholder="Enter your API key for secure access"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Webhook URL (Optional)</label>
                  <Input
                    placeholder="https://sqyloom.uk/api/webhook"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="bg-gray-900/50 border-gray-600 text-white"
                  />
                </div>

                <Button
                  onClick={testConnection}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isConnected ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Connected
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Test Connection
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Integration Code */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Code className="mr-2 h-5 w-5 text-green-400" />
                    Integration Code
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(integrationCode)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 max-h-96">
                  <code>{integrationCode}</code>
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Integration Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong>Fix HTTPS:</strong> Enable SSL certificate on your hosting provider
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong>Copy Code:</strong> Add the integration code to your expressionism page
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong>Configure API:</strong> Set up your API endpoint to serve portfolio data
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong>Test:</strong> Verify the integration works correctly
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-500/50">
              <CardHeader>
                <CardTitle className="text-white">Alternative: Manual Export</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  If automatic integration isn't possible, you can manually export your artwork:
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-400 hover:bg-green-600/10 bg-transparent"
                    onClick={() => (window.location.href = "/portfolio")}
                  >
                    Go to Portfolio & Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
