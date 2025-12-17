// Domain configuration for The Ineffable
export const DOMAIN_CONFIG = {
  // Main domain configuration
  MAIN_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || "localhost:3000",
  PROTOCOL: process.env.NEXT_PUBLIC_PROTOCOL || "http",

  // Full URL construction
  get BASE_URL() {
    return `${this.PROTOCOL}://${this.MAIN_DOMAIN}`
  },

  // API endpoints
  API_BASE: process.env.NEXT_PUBLIC_API_BASE || "/api",

  // External integrations
  SQYLOOM_DOMAIN: "sqyloom.uk",
  SQYLOOM_URL: "https://sqyloom.uk",

  // Social sharing URLs
  get SHARE_URL() {
    return this.BASE_URL
  },

  // SEO and metadata
  SITE_NAME: "The Ineffable",
  SITE_DESCRIPTION:
    "A futuristic platform blending cutting-edge AI and immersive technology to create a deeply personalized, interactive, and enduring legacy.",

  // Contact and support
  SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@your-domain.com",

  // Feature flags based on domain
  get FEATURES() {
    const isProduction = this.MAIN_DOMAIN !== "localhost:3000"
    return {
      ANALYTICS: isProduction,
      REAL_AI_SERVICES: isProduction,
      CLOUD_STORAGE: isProduction,
      PAYMENTS: isProduction,
    }
  },
}

// Domain-specific configurations
export const getDomainConfig = (hostname?: string) => {
  const domain = hostname || DOMAIN_CONFIG.MAIN_DOMAIN

  // Custom configurations per domain/subdomain
  const configs = {
    "localhost:3000": {
      environment: "development",
      features: {
        debug: true,
        mockData: true,
      },
    },
    "staging.your-domain.com": {
      environment: "staging",
      features: {
        debug: true,
        mockData: false,
      },
    },
    "your-domain.com": {
      environment: "production",
      features: {
        debug: false,
        mockData: false,
      },
    },
  }

  return configs[domain as keyof typeof configs] || configs["localhost:3000"]
}
