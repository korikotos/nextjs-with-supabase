interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  timestamp: string
}

interface UserSession {
  id: string
  email: string
  domains: string[]
  permissions: string[]
  lastActive: string
}

interface ProjectData {
  id: string
  name: string
  domain: string
  status: "active" | "development" | "archived"
  lastModified: string
  metadata: Record<string, any>
}

class SQYLOOMAPIService {
  private baseURL: string
  private apiKey: string | null = null

  constructor(domain = "sqyloom.uk") {
    this.baseURL = `https://api.${domain}`
  }

  // Authentication
  async authenticate(email: string, password: string): Promise<APIResponse<UserSession>> {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      const data = await response.json()

      if (data.success && data.token) {
        this.apiKey = data.token
        localStorage.setItem("sqyloom_token", data.token)
      }

      return data
    } catch (error) {
      return {
        success: false,
        error: "Authentication failed",
        timestamp: new Date().toISOString(),
      }
    }
  }

  // Project Management
  async getProjects(): Promise<APIResponse<ProjectData[]>> {
    return this.makeRequest("/projects")
  }

  async createProject(projectData: Partial<ProjectData>): Promise<APIResponse<ProjectData>> {
    return this.makeRequest("/projects", "POST", projectData)
  }

  async updateProject(id: string, updates: Partial<ProjectData>): Promise<APIResponse<ProjectData>> {
    return this.makeRequest(`/projects/${id}`, "PUT", updates)
  }

  // File Storage
  async uploadFile(file: File, path = ""): Promise<APIResponse<{ url: string; id: string }>> {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("path", path)

    return this.makeRequest("/storage/upload", "POST", formData, false)
  }

  async getFileUrl(fileId: string): Promise<string> {
    return `${this.baseURL}/storage/files/${fileId}`
  }

  // Analytics
  async trackEvent(event: string, data: Record<string, any>): Promise<void> {
    this.makeRequest("/analytics/track", "POST", {
      event,
      data,
      domain: window.location.hostname,
      timestamp: new Date().toISOString(),
    }).catch(console.error) // Fire and forget
  }

  // Quantum Terminal Data
  async saveTerminalSession(sessionData: any): Promise<APIResponse> {
    return this.makeRequest("/terminal/sessions", "POST", sessionData)
  }

  async getTerminalHistory(userId: string): Promise<APIResponse<any[]>> {
    return this.makeRequest(`/terminal/history/${userId}`)
  }

  // Private helper method
  private async makeRequest(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    data?: any,
    isJSON = true,
  ): Promise<APIResponse> {
    try {
      const headers: Record<string, string> = {}

      if (this.apiKey) {
        headers["Authorization"] = `Bearer ${this.apiKey}`
      }

      if (isJSON && data) {
        headers["Content-Type"] = "application/json"
      }

      const config: RequestInit = {
        method,
        headers,
        credentials: "include",
      }

      if (data) {
        config.body = isJSON ? JSON.stringify(data) : data
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, config)
      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      }
    }
  }

  // Initialize API key from storage
  init() {
    const token = localStorage.getItem("sqyloom_token")
    if (token) {
      this.apiKey = token
    }
  }
}

// Export singleton instance
export const sqyloomAPI = new SQYLOOMAPIService()

// Initialize on import
if (typeof window !== "undefined") {
  sqyloomAPI.init()
}
