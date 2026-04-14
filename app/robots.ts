import type { MetadataRoute } from "next"
import { DOMAIN_CONFIG } from "@/app/config/domain"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = DOMAIN_CONFIG.BASE_URL

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/", "/private/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
