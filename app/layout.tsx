import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "OralVis Healthcare – Dental Scan Management",
    template: "%s | OralVis Healthcare",
  },
  description:
    "OralVis Healthcare enables technicians to upload dental scans and dentists to review and export reports. Fast, accessible, and responsive.",
  keywords: ["oral health", "dental AI", "healthcare app", "oralvis"],
  authors: [{ name: "OralVis Team" }],
  generator: "v0.app",
  metadataBase: new URL("https://v0-oral-vis-healthcare-app-rho.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OralVis Healthcare App",
    description: "AI-powered oral health detection and recommendations.",
    type: "website",
    url: "https://v0-oral-vis-healthcare-app-rho.vercel.app/",
    images: ["/preview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OralVis Healthcare App",
    description: "AI-powered oral health detection and recommendations.",
    images: ["/preview.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <head></head>
      <body className="font-sans bg-background text-foreground">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
