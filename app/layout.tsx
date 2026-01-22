import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ClientBody from "@/components/client-body"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SQYLOOM Quantum Holography Terminal",
  description: "Futuristic quantum holography terminal with AI integration by Quick Jet Services",
  keywords: "quantum, holography, terminal, AI, SQYLOOM, browser",
  authors: [{ name: "Quick Jet Services", url: "https://hichammneimne.com" }],
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ClientBody>{children}</ClientBody>
        </ThemeProvider>
      </body>
    </html>
  )
}
