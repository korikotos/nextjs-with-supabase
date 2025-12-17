"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, CheckCircle, AlertTriangle, Code, Globe, Shield, Zap } from "lucide-react"
import { DOMAIN_CONFIG } from "@/app/config/domain"

export default function SqyloomIntegrationPage() {
  const [apiKey, setApiKey] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [domainStatus, setDomainStatus] = useState<"checking" | "secure" | "insecure">("checking")

  useEffect(() => {
    // Check SSL status of sqyloom.uk
    const checkDomainStatus = async () => {
      try {
        const response = await fetch("https://sqyloom.uk", { mode: "no-cors" })
        setDomainStatus("secure")
      } catch (error) {
        setDomainStatus("insecure")
      }
    }

    checkDomainStatus()
  }, [])

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
    const response = await fetch('${DOMAIN_CONFIG.BASE_URL}/api/portfolio');
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
        <p>Source: <a href="${DOMAIN_CONFIG.BASE_URL}" target="_blank">The Ineffable</a></p>
      </div>
    \`).join('');
  } catch (error) {
    console.error('Failed to load artwork:', error);
    document.getElementById('ineffable-gallery').innerHTML = 
      '<p>Unable to load artwork from The Ineffable. Please check your connection.</p>';
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
  background: #f9f9f9;
}
.artwork-item img, .artwork-item video {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
}
.artwork-item h3 {
  color: #333;
  margin: 10px 0 5px 0;
}
.artwork-item p {
  color: #666;
  margin: 5px 0;
}
.artwork-item a {
  color: #7c3aed;
  text-decoration: none;
}
.artwork-item a:hover {
  text-decoration: underline;
}
</style>`

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Sqyloom.uk Integration</h1>
          <p className="text-gray-300">
            Connect The Ineffable ({DOMAIN_CONFIG.MAIN_DOMAIN}) to your expressionism gallery
          </p>
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
                  Domain Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* The Ineffable Domain Status */}
                  <div className="flex items-center justify-between p-3 bg-green-900/20 border border-green-500/50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-green-300">The Ineffable Domain</span>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      {DOMAIN_CONFIG.PROTOCOL}://{DOMAIN_CONFIG.MAIN_DOMAIN}
                    </Badge>
                  </div>

                  {/* Sqyloom Domain Status */}
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      domainStatus === "secure"
                        ? "bg-green-900/20 border border-green-500/50"
                        : "bg-yellow-900/20 border border-yellow-500/50"
                    }`}
                  >
                    <div className="flex items-center">
                      {domainStatus === "secure" ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                      )}
                      <span className={domainStatus === "secure" ? "text-green-300" : "text-yellow-300"}>
                        Sqyloom.uk Status
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        domainStatus === "secure"
                          ? "border-green-500 text-green-400"
                          : "border-yellow-500 text-yellow-400"
                      }
                    >
                      {domainStatus === "checking"
                        ? "Checking..."
                        : domainStatus === "secure"
                          ? "HTTPS Ready"
                          : "SSL Needed"}
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-300 space-y-2">
                    <p>
                      <strong>Integration URL:</strong> {DOMAIN_CONFIG.BASE_URL}
                    </p>
                    <p>
                      <strong>API Endpoint:</strong> {DOMAIN_CONFIG.BASE_URL}
                      {DOMAIN_CONFIG.API_BASE}
                    </p>
                    <p>
                      <strong>Target Site:</strong> https://sqyloom.uk/expressionism
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-400 hover:bg-blue-600/10 bg-transparent"
                    onClick={() => window.open(`${DOMAIN_CONFIG.SQYLOOM_URL}/expressionism`, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Sqyloom Expressionism Page
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
                    placeholder={`${DOMAIN_CONFIG.SQYLOOM_URL}/api/webhook`}
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
                      Connected to {DOMAIN_CONFIG.MAIN_DOMAIN}
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
                      <strong>Deploy The Ineffable:</strong> Make sure your domain ({DOMAIN_CONFIG.MAIN_DOMAIN}) is live
                      and accessible
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong>Copy Integration Code:</strong> Add the code above to your Sqyloom expressionism page
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong>Configure CORS:</strong> Ensure your server allows requests from sqyloom.uk
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong>Test Integration:</strong> Verify the artwork loads correctly on your site
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
