"use client"

import { useState, useEffect } from "react"
import {
  Search,
  CreditCard,
  Copy,
  Check,
  Download,
  FileText,
  Info,
  Moon,
  Sun,
  Share2,
  Bookmark,
  BookmarkCheck,
  History,
  Database,
  HelpCircle,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Code,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface BinData {
  number: string
  country: string
  flag: string
  vendor: string
  type: string
  level: string
  bank_name: string
}

export default function Home() {
  const [bin, setBin] = useState("")
  const [bulkBins, setBulkBins] = useState("")
  const [binData, setBinData] = useState<BinData | null>(null)
  const [bulkResults, setBulkResults] = useState<BinData[]>([])
  const [loading, setLoading] = useState(false)
  const [bulkLoading, setBulkLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bulkError, setBulkError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [stats, setStats] = useState({ totalBins: 0, countries: 0, banks: 0 })
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    // Fetch stats
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
      })
      .catch((err) => {
        console.error("Failed to fetch stats:", err)
      })
  }, [])

  const handleSearch = async () => {
    if (bin.length < 6) {
      setError("Please enter at least 6 digits")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://binsapi.vercel.app/api/bin?bin=${bin}`)

      if (!response.ok) {
        throw new Error("Failed to fetch bin data")
      }

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setBinData(null)
      } else {
        setBinData(data)

        // Add to recent searches
        const updatedSearches = [bin, ...recentSearches.filter((s) => s !== bin)].slice(0, 5)
        setRecentSearches(updatedSearches)
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
      }
    } catch (err) {
      setError("An error occurred while fetching bin data")
    } finally {
      setLoading(false)
    }
  }

  const handleBulkSearch = async () => {
    if (!bulkBins.trim()) {
      setBulkError("Please enter at least one BIN")
      return
    }

    const bins = bulkBins
      .split(/[\n,\s]+/)
      .map((b) => b.trim())
      .filter((b) => b.length >= 6)

    if (bins.length === 0) {
      setBulkError("No valid BINs found. BINs should be at least 6 digits")
      return
    }

    if (bins.length > 50) {
      setBulkError("Maximum 50 BINs allowed at once")
      return
    }

    setBulkLoading(true)
    setBulkError(null)

    try {
      const response = await fetch("https://binsapi.vercel.app/api/bulk-bin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bins }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch bulk bin data")
      }

      const data = await response.json()

      if (data.error) {
        setBulkError(data.error)
        setBulkResults([])
      } else {
        setBulkResults(data.results)
        if (data.results.length === 0) {
          setBulkError("No matching BINs found")
        }
      }
    } catch (err) {
      setBulkError("An error occurred while fetching bulk bin data")
    } finally {
      setBulkLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "The BIN information has been copied to your clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadBulkResults = () => {
    if (bulkResults.length === 0) return

    const headers = "BIN,Country,Flag,Vendor,Type,Level,Bank Name\n"
    const csvContent =
      headers +
      bulkResults
        .map(
          (result) =>
            `${result.number},${result.country},${result.flag},${result.vendor},${result.type},${result.level},"${result.bank_name}"`,
        )
        .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "bin_results.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download started",
      description: "Your BIN results are being downloaded as a CSV file",
    })
  }

  const toggleFavorite = (binNumber: string) => {
    let updatedFavorites
    if (favorites.includes(binNumber)) {
      updatedFavorites = favorites.filter((f) => f !== binNumber)
      toast({
        title: "Removed from favorites",
        description: `BIN ${binNumber} has been removed from your favorites`,
      })
    } else {
      updatedFavorites = [...favorites, binNumber]
      toast({
        title: "Added to favorites",
        description: `BIN ${binNumber} has been added to your favorites`,
      })
    }
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

  const shareResults = () => {
    if (!binData) return

    const text = `BIN Information: ${binData.number}
Country: ${binData.country} ${binData.flag}
Vendor: ${binData.vendor}
Type: ${binData.type}
Level: ${binData.level}
Bank: ${binData.bank_name}
Checked with BIN Checker Pro`

    if (navigator.share) {
      navigator
        .share({
          title: `BIN ${binData.number} Information`,
          text: text,
        })
        .catch((err) => {
          copyToClipboard(text)
        })
    } else {
      copyToClipboard(text)
    }
  }

  const getVendorIcon = (vendor: string) => {
    switch (vendor.toLowerCase()) {
      case "visa":
        return "💳 Visa"
      case "mastercard":
        return "💳 Mastercard"
      case "amex":
      case "american express":
        return "💳 American Express"
      case "discover":
        return "💳 Discover"
      case "jcb":
        return "💳 JCB"
      case "diners club":
      case "diners":
        return "💳 Diners Club"
      case "unionpay":
        return "💳 UnionPay"
      default:
        return `💳 ${vendor}`
    }
  }

  const getCardTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "credit":
        return "bg-gradient-to-r from-blue-500 to-blue-700"
      case "debit":
        return "bg-gradient-to-r from-green-500 to-green-700"
      case "prepaid":
        return "bg-gradient-to-r from-amber-500 to-amber-700"
      default:
        return "bg-gradient-to-r from-slate-500 to-slate-700"
    }
  }

  const getCardLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "platinum":
      case "premium":
        return "bg-gradient-to-r from-slate-600 to-slate-800"
      case "gold":
        return "bg-gradient-to-r from-amber-500 to-amber-700"
      case "business":
        return "bg-gradient-to-r from-indigo-500 to-indigo-700"
      case "classic":
        return "bg-gradient-to-r from-blue-500 to-blue-700"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-700"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">BIN Checker Pro</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/api/docs">
              <Button variant="ghost" className="gap-2">
                <Code className="h-4 w-4" />
                <span className="hidden md:inline">API Docs</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Info className="h-5 w-5" />
                    <span className="sr-only">About BIN Checker</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Check credit card BIN information</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </div>
      </header>

      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <div className="inline-block p-1 px-3 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Trusted by professionals worldwide
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Bank Identification Number Checker
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Instantly verify and identify credit card details using the first 6-8 digits (BIN). Our comprehensive
            database provides accurate information for all major card issuers.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
            <div className="flex flex-col items-center p-3 rounded-lg bg-card/50 border">
              <Database className="h-5 w-5 text-primary mb-1" />
              <div className="text-2xl font-bold">{stats.totalBins.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">BINs in Database</div>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-card/50 border">
              <CreditCard className="h-5 w-5 text-primary mb-1" />
              <div className="text-2xl font-bold">{stats.banks.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Banks Covered</div>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-card/50 border">
              <Info className="h-5 w-5 text-primary mb-1" />
              <div className="text-2xl font-bold">{stats.countries.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-10">
          <Card className="border-2 shadow-lg overflow-hidden">
            <CardHeader className="pb-4 bg-muted/30">
              <CardTitle className="text-2xl">BIN Lookup Tool</CardTitle>
              <CardDescription>
                Enter a Bank Identification Number (BIN) to get detailed card information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="single" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="single">Single BIN</TabsTrigger>
                  <TabsTrigger value="bulk">Bulk Check</TabsTrigger>
                </TabsList>

                <TabsContent value="single">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter BIN (first 6-8 digits)"
                      value={bin}
                      onChange={(e) => setBin(e.target.value.replace(/\D/g, "").slice(0, 8))}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSearch}
                      disabled={loading}
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      {loading ? "Searching..." : <Search className="h-4 w-4 mr-2" />}
                      Check
                    </Button>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {recentSearches.length > 0 && !binData && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <History className="h-4 w-4 mr-1" /> Recent Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer hover:bg-muted"
                            onClick={() => {
                              setBin(search)
                              handleSearch()
                            }}
                          >
                            {search}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {binData && (
                    <div className="mt-6 space-y-6">
                      <div className="relative overflow-hidden rounded-xl border-2 border-primary/20 bg-card">
                        <div className={cn("absolute inset-0 opacity-10", getCardTypeColor(binData.type))} />

                        <div className="relative p-6">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h3 className="text-2xl font-bold mb-1">{binData.number}</h3>
                              <div className="text-sm text-muted-foreground">
                                {binData.country} {binData.flag}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => toggleFavorite(binData.number)}
                                className="rounded-full h-8 w-8"
                              >
                                {favorites.includes(binData.number) ? (
                                  <BookmarkCheck className="h-4 w-4 text-primary" />
                                ) : (
                                  <Bookmark className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={shareResults}
                                className="rounded-full h-8 w-8"
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => copyToClipboard(JSON.stringify(binData, null, 2))}
                                className="rounded-full h-8 w-8"
                              >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Card Vendor</div>
                              <div className="font-semibold flex items-center">
                                <Badge variant="outline" className="mr-2">
                                  {getVendorIcon(binData.vendor)}
                                </Badge>
                                {binData.vendor}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Issuing Bank</div>
                              <div className="font-semibold">{binData.bank_name}</div>
                            </div>

                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Card Type</div>
                              <div>
                                <Badge className={cn("text-white font-medium", getCardTypeColor(binData.type))}>
                                  {binData.type}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="text-sm text-muted-foreground">Card Level</div>
                              <div>
                                <Badge className={cn("text-white font-medium", getCardLevelColor(binData.level))}>
                                  {binData.level}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Card Details</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">Card Network:</span>
                                <span className="font-medium">{binData.vendor}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">Card Type:</span>
                                <span className="font-medium">{binData.type}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">Card Level:</span>
                                <span className="font-medium">{binData.level}</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Issuer Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm">
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">Bank Name:</span>
                                <span className="font-medium">{binData.bank_name}</span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">Country:</span>
                                <span className="font-medium">
                                  {binData.country} {binData.flag}
                                </span>
                              </li>
                              <li className="flex justify-between">
                                <span className="text-muted-foreground">BIN/IIN:</span>
                                <span className="font-medium">{binData.number}</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="bulk">
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Enter multiple BINs (separated by commas, spaces, or new lines)"
                      value={bulkBins}
                      onChange={(e) => setBulkBins(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={handleBulkSearch}
                        disabled={bulkLoading}
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        {bulkLoading ? "Processing..." : <FileText className="h-4 w-4 mr-2" />}
                        Check BINs
                      </Button>
                    </div>
                  </div>

                  {bulkError && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>{bulkError}</AlertDescription>
                    </Alert>
                  )}

                  {bulkResults.length > 0 && (
                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <Database className="h-4 w-4 mr-2" />
                          Results ({bulkResults.length})
                        </h3>
                        <Button variant="outline" size="sm" onClick={downloadBulkResults} className="gap-1">
                          <Download className="h-4 w-4" />
                          Download CSV
                        </Button>
                      </div>
                      <div className="border rounded-md overflow-auto max-h-[400px] shadow-sm">
                        <Table>
                          <TableHeader className="bg-muted/50 sticky top-0">
                            <TableRow>
                              <TableHead>BIN</TableHead>
                              <TableHead>Country</TableHead>
                              <TableHead>Vendor</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Level</TableHead>
                              <TableHead>Bank</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {bulkResults.map((result, index) => (
                              <TableRow key={index} className="hover:bg-muted/30">
                                <TableCell className="font-medium">{result.number}</TableCell>
                                <TableCell>
                                  {result.country} {result.flag}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{getVendorIcon(result.vendor)}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={cn("text-white font-medium text-xs", getCardTypeColor(result.type))}
                                  >
                                    {result.type}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={cn("text-white font-medium text-xs", getCardLevelColor(result.level))}
                                  >
                                    {result.level}
                                  </Badge>
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">{result.bank_name}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2 mb-12">
          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2 text-primary" />
                What is a BIN?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                A Bank Identification Number (BIN), also known as an Issuer Identification Number (IIN), is the first
                6-8 digits of a payment card number. These digits identify the institution that issued the card to the
                cardholder.
              </p>
              <p className="text-muted-foreground">
                BINs are essential for identifying key attributes of payment cards, including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                <li>Card brand (Visa, Mastercard, etc.)</li>
                <li>Card type (credit, debit, prepaid)</li>
                <li>Issuing bank or financial institution</li>
                <li>Card level (standard, gold, platinum)</li>
                <li>Country of issuance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                Why Check BINs?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">BIN checking is valuable for various legitimate purposes:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Merchants can verify card details before processing payments</li>
                <li>Fraud prevention teams can identify suspicious transactions</li>
                <li>Payment processors can route transactions correctly</li>
                <li>Developers can test payment systems with valid BIN ranges</li>
                <li>Researchers can analyze payment card distribution and usage</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Our BIN checker provides accurate, up-to-date information from our comprehensive database of global card
                issuers.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is BIN checking legal?</AccordionTrigger>
              <AccordionContent>
                Yes, BIN checking is legal and is commonly used by merchants, payment processors, and financial
                institutions. BIN data is not considered sensitive personal information as it only identifies the card
                issuer, not the individual cardholder. However, it should be used responsibly and in compliance with
                applicable regulations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How accurate is the BIN database?</AccordionTrigger>
              <AccordionContent>
                Our BIN database is regularly updated to maintain high accuracy. We source information from financial
                institutions, card networks, and trusted industry partners. While we strive for 100% accuracy,
                occasional discrepancies may occur due to recent changes by card issuers or newly introduced BIN ranges.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I use this tool for my business?</AccordionTrigger>
              <AccordionContent>
                Yes, our BIN checker is suitable for business use. Many companies integrate BIN checking into their
                payment processing systems for fraud prevention, transaction routing, and customer analytics. For
                high-volume commercial use, we recommend contacting us about our API access options.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How many digits should I enter for a BIN check?</AccordionTrigger>
              <AccordionContent>
                Traditionally, BINs were the first 6 digits of a card number. However, since 2017, the industry has been
                transitioning to 8-digit BINs. Our system can identify cards using either 6 or 8 digits, though
                providing 8 digits when available may yield more specific results.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is my search data stored or shared?</AccordionTrigger>
              <AccordionContent>
                We store minimal data about searches to improve our service. Your recent searches are stored locally in
                your browser for convenience but are not linked to your identity. We do not share individual search data
                with third parties. For more information, please review our Privacy Policy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-2 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Code className="h-5 w-5 mr-2" />
                API Access
              </CardTitle>
              <CardDescription>Integrate our BIN database directly into your applications</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-2">Public API</h3>
                <p className="text-muted-foreground mb-4">
                  We now offer a free public API for basic BIN lookups. Perfect for developers who need to integrate BIN
                  checking into their applications.
                </p>
                <div className="bg-muted p-3 rounded-md font-mono text-xs overflow-x-auto">
                  GET https://binsapi.vercel.app/api/bin?bin=411111
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <Link href="/api/docs">
                  <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    <Code className="h-4 w-4 mr-2" />
                    View API Documentation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Contact Us</CardTitle>
              <CardDescription>Have questions about our BIN checker or need assistance?</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-2">Get in Touch</h3>
                <p className="text-muted-foreground mb-4">
                  Our team is available to answer your questions and provide support for any issues you may encounter.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <span>support@binsapi.vercel.app</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Premium API Access</h3>
                <p className="text-muted-foreground mb-4">
                  Need higher rate limits or additional features? Upgrade to our premium API service.
                </p>
                <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  Contact for Premium Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="border-t py-12 mt-20 bg-muted/30">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">BIN Checker Pro</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The most comprehensive and accurate BIN lookup tool for professionals and businesses.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/api/docs">
                  <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                    API Documentation
                  </Button>
                </Link>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  Developer Guide
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  BIN Database
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  Card Issuer Directory
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  About Us
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  Contact
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  Careers
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  Blog
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  GDPR Compliance
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} BIN Checker Pro. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-xs">
                English
              </Button>
              <Separator orientation="vertical" className="h-4" />
              <Button variant="ghost" size="sm" className="text-xs">
                USD
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

