import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import { DOMAIN_CONFIG } from "@/app/config/domain"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: `${DOMAIN_CONFIG.SITE_NAME} - Transcending Time Through AI & Creative Generation`,
  description: DOMAIN_CONFIG.SITE_DESCRIPTION,
  keywords:
    "AI, creative generation, React components, image generation, video creation, digital legacy, portfolio management",
  authors: [{ name: "The Ineffable Team" }],
  creator: "The Ineffable",
  publisher: "The Ineffable",
  metadataBase: new URL(DOMAIN_CONFIG.BASE_URL),
  alternates: {
    canonical: DOMAIN_CONFIG.BASE_URL,
  },
  openGraph: {
    title: DOMAIN_CONFIG.SITE_NAME,
    description: DOMAIN_CONFIG.SITE_DESCRIPTION,
    url: DOMAIN_CONFIG.BASE_URL,
    siteName: DOMAIN_CONFIG.SITE_NAME,
    images: [
      {
        url: `${DOMAIN_CONFIG.BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: DOMAIN_CONFIG.SITE_NAME,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DOMAIN_CONFIG.SITE_NAME,
    description: DOMAIN_CONFIG.SITE_DESCRIPTION,
    images: [`${DOMAIN_CONFIG.BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href={DOMAIN_CONFIG.BASE_URL} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} min-h-screen bg-black text-white antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
