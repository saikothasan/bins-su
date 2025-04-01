import type { Metadata } from "next"
import ApiDocsClient from "./ApiDocsClient"

export const metadata: Metadata = {
  title: "API Documentation - BIN Checker Pro",
  description:
    "Integrate our BIN lookup API into your applications. Get detailed documentation on endpoints, parameters, and response formats.",
  keywords: "BIN API, credit card API, BIN lookup API, payment card API, bank identification number API",
  openGraph: {
    title: "BIN Checker API Documentation",
    description: "Integrate our BIN lookup API into your applications with our comprehensive documentation.",
    url: "https://binsapi.vercel.app/api/docs",
    siteName: "BIN Checker Pro",
    locale: "en_US",
    type: "website",
  },
}

export default function ApiDocs() {
  return <ApiDocsClient />
}

