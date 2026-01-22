export interface DomainConfig {
  domain: string
  host: "vercel" | "lifetime"
  purpose: string
  theme: string
  features: string[]
  apiEndpoint?: string
}

export const SQYLOOM_EMPIRE: Record<string, DomainConfig> = {
  "sqyloom.net": {
    domain: "sqyloom.net",
    host: "vercel",
    purpose: "Global Hub & Quantum Terminal",
    theme: "quantum-professional",
    features: ["quantum-terminal", "ai-browser", "portfolio", "documentation"],
    apiEndpoint: "https://api.sqyloom.uk",
  },
  "sqyloom.co.uk": {
    domain: "sqyloom.co.uk",
    host: "vercel",
    purpose: "UK Business & Services",
    theme: "quantum-business-uk",
    features: ["uk-landing", "business-services", "local-contact", "gdpr-compliance"],
    apiEndpoint: "https://api.sqyloom.uk",
  },
  "sqyloom.me": {
    domain: "sqyloom.me",
    host: "vercel",
    purpose: "Personal Brand & Experiments",
    theme: "quantum-personal",
    features: ["blog", "experiments", "personal-projects", "creative-playground"],
    apiEndpoint: "https://api.sqyloom.uk",
  },
  "sqyloom.uk": {
    domain: "sqyloom.uk",
    host: "lifetime",
    purpose: "Core Infrastructure & APIs",
    theme: "quantum-infrastructure",
    features: ["api-services", "authentication", "database", "file-storage"],
  },
}

export function getDomainConfig(hostname: string): DomainConfig {
  return SQYLOOM_EMPIRE[hostname] || SQYLOOM_EMPIRE["sqyloom.net"]
}

export function getApiEndpoint(hostname: string): string {
  const config = getDomainConfig(hostname)
  return config.apiEndpoint || "https://api.sqyloom.uk"
}
