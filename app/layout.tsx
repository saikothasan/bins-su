import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BIN Checker Pro - Bank Identification Number Lookup Tool",
  description:
    "Verify credit card details with our BIN checker. Get information about card type, issuing bank, country, and more using the first 6-8 digits of a card number.",
  keywords:
    "BIN checker, bank identification number, credit card checker, card BIN lookup, BIN search, card verification, IIN lookup, issuer identification number, credit card BIN, debit card BIN, payment card industry, card issuer database",
  authors: [{ name: "BIN Checker Pro Team" }],
  creator: "BIN Checker Pro",
  publisher: "BIN Checker Pro",
  openGraph: {
    title: "BIN Checker Pro - Bank Identification Number Lookup Tool",
    description:
      "Verify credit card details with our BIN checker. Get information about card type, issuing bank, country, and more.",
    url: "https://binsapi.vercel.app",
    siteName: "BIN Checker Pro",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://binsapi.vercel.app/image1.png",
        width: 1200,
        height: 630,
        alt: "BIN Checker Pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BIN Checker Pro - Bank Identification Number Lookup Tool",
    description:
      "Verify credit card details with our BIN checker. Get information about card type, issuing bank, country, and more.",
    images: ["https://binsapi.vercel.app/image1.png"],
    creator: "@bincheckerpro",
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
  alternates: {
    canonical: "https://binsapi.vercel.app",
    languages: {
      "en-US": "https://binsapi.vercel.app",
    },
  },
  verification: {
    google: "WFBrJWNp_xBR5q-hEk6WgWtBmPvBJKbJ4jz1AdGp_no",
  },
  category: "Technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="BIN Checker Pro" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BIN Checker Pro" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#ffffff" />

        {/* Structured data for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "BIN Checker Pro",
              url: "https://binsapi.vercel.app",
              description:
                "Verify credit card details with our BIN checker. Get information about card type, issuing bank, country, and more.",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
              },
            }),
          }}
        />

        {/* FAQ structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is BIN checking legal?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, BIN checking is legal and is commonly used by merchants, payment processors, and financial institutions. BIN data is not considered sensitive personal information as it only identifies the card issuer, not the individual cardholder.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How accurate is the BIN database?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our BIN database is regularly updated to maintain high accuracy. We source information from financial institutions, card networks, and trusted industry partners.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How many digits should I enter for a BIN check?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Traditionally, BINs were the first 6 digits of a card number. However, since 2017, the industry has been transitioning to 8-digit BINs. Our system can identify cards using either 6 or 8 digits.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

