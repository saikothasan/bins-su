"use client"

import { useState } from "react"
import { Search, CreditCard, Copy, Check, Download, FileText, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()

  const handleSearch = async () => {
    if (bin.length < 6) {
      setError("Please enter at least 6 digits")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/bin?bin=${bin}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch bin data")
      }

      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
        setBinData(null)
      } else {
        setBinData(data)
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
      .map(b => b.trim())
      .filter(b => b.length >= 6)
    
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
      const response = await fetch('/api/bulk-bin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    const csvContent = headers + bulkResults.map(result => 
      `${result.number},${result.country},${result.flag},${result.vendor},${result.type},${result.level},"${result.bank_name}"`
    ).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'bin_results.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Download started",
      description: "Your BIN results are being downloaded as a CSV file",
    })
  }

  const getVendorIcon = (vendor: string) => {
    switch(vendor.toLowerCase()) {
      case 'visa': return '💳 Visa'
      case 'mastercard': return '💳 Mastercard'
      case 'amex': 
      case 'american express': return '💳 American Express'
      case 'discover': return '💳 Discover'
      case 'jcb': return '💳 JCB'
      case 'diners club': 
      case 'diners': return '💳 Diners Club'
      case 'unionpay': return '💳 UnionPay'
      default: return `💳 ${vendor}`
    }
  }

  return (
    <main className="min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-primary" />
            <span className="font-bold">BIN Checker Pro</span>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
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
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Bank Identification Number Checker
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Instantly verify and identify credit card details using the first 6-8 digits (BIN)
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-10">
          <Card className="border-2">
            <CardHeader className="pb-4">
              <CardTitle>BIN Lookup Tool</CardTitle>
              <CardDescription>
                Enter a Bank Identification Number (BIN) to get detailed card information
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                    <Button onClick={handleSearch} disabled={loading}>
                      {loading ? "Searching..." : <Search className="h-4 w-4 mr-2" />}
                      Check
                    </Button>
                  </div>
                  
                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {binData && (
                    <Card className="mt-6 border-2 border-primary/20">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle>BIN: {binData.number}</CardTitle>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => copyToClipboard(JSON.stringify(binData, null, 2))}
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableHead className="w-[200px]">Country</TableHead>
                              <TableCell>{binData.country} {binData.flag}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead>Card Vendor</TableHead>
                              <TableCell>
                                <Badge variant="outline" className="font-semibold">
                                  {getVendorIcon(binData.vendor)}
                                </Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead>Card Type</TableHead>
                              <TableCell>{binData.type}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead>Card Level</TableHead>
                              <TableCell>{binData.level}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableHead>Bank Name</TableHead>
                              <TableCell>{binData.bank_name}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
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
                      <Button onClick={handleBulkSearch} disabled={bulkLoading}>
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
                        <h3 className="text-lg font-semibold">Results ({bulkResults.length})</h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={downloadBulkResults}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download CSV
                        </Button>
                      </div>
                      <div className="border rounded-md overflow-auto max-h-[400px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>BIN</TableHead>
                              <TableHead>Country</TableHead>
                              <TableHead>Vendor</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Bank</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {bulkResults.map((result, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{result.number}</TableCell>
                                <TableCell>{result.country} {result.flag}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {getVendorIcon(result.vendor)}
                                  </Badge>
                                </TableCell>
                                <TableCell>{result.type}</TableCell>
                                <TableCell>{result.bank_name}</TableCell>
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
        
        <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>What is a BIN?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A Bank Identification Number (BIN) is the first 6-8 digits of a credit card number. 
                It identifies the card issuing institution and provides details about the card type, 
                brand, and country of origin.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Why Check BINs?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                BIN checking helps verify card authenticity, identify the issuing bank, 
                and determine card details like type (debit/credit), brand (Visa/Mastercard), 
                and level (standard/platinum/business).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} BIN Checker Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Privacy Policy</Button>
            <Button variant="ghost" size="sm">Terms of Service</Button>
          </div>
        </div>
      </footer>
    </main>
  )
}
