"use client"

import React from "react"
import { Server, Globe, Shield, Zap, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ApiDocsClient() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50 pb-20">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto mb-10">
          <div className="inline-block p-1 px-3 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Developer Resources
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            BIN Checker API Documentation
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            Integrate our powerful BIN lookup capabilities directly into your applications with our simple and reliable
            REST API.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3 mb-12">
          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Server className="h-5 w-5 mr-2 text-primary" />
                Reliable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                99.9% uptime with fast response times and global CDN distribution
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                Comprehensive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Access to our extensive database of BINs from issuers worldwide
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Secure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                HTTPS encryption and optional API key authentication for all requests
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-2 shadow-lg overflow-hidden">
            <CardHeader className="pb-4 bg-muted/30">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">Getting Started</CardTitle>
                  <CardDescription>Quick guide to using the BIN Checker API</CardDescription>
                </div>
                <Badge variant="outline" className="font-mono text-xs">
                  Base URL: https://binsapi.vercel.app
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Authentication</h3>
                  <p className="text-muted-foreground mb-4">
                    The public API endpoint doesn't require authentication for basic usage. For higher rate limits and
                    additional features, contact us about our premium API plans.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Rate Limits</h3>
                  <p className="text-muted-foreground mb-4">
                    Public API: 100 requests per hour per IP address
                    <br />
                    Premium API: Custom limits based on your plan
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Response Format</h3>
                  <p className="text-muted-foreground mb-2">All API responses are returned in JSON format.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-2 shadow-lg overflow-hidden">
            <CardHeader className="pb-4 bg-muted/30">
              <CardTitle className="text-2xl">API Reference</CardTitle>
              <CardDescription>Detailed documentation for all available endpoints</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="single" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="single">Single BIN Lookup</TabsTrigger>
                  <TabsTrigger value="bulk">Bulk BIN Lookup</TabsTrigger>
                </TabsList>

                <TabsContent value="single">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">GET /api/bin</h3>
                        <Badge className="bg-green-600">GET</Badge>
                      </div>
                      <p className="text-muted-foreground mt-2 mb-4">Retrieve information about a single BIN.</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Request Parameters</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Parameter</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Required</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">bin</TableCell>
                            <TableCell>string</TableCell>
                            <TableCell>Yes</TableCell>
                            <TableCell>The first 6-8 digits of a card number</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Example Request</h4>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto font-mono text-sm">
                          <code>curl https://binsapi.vercel.app/api/bin?bin=411111</code>
                        </pre>
                        <CopyButton text="curl https://binsapi.vercel.app/api/bin?bin=411111" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Example Response</h4>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto font-mono text-sm">
                          <code>{`{
  "number": "411111",
  "country": "United States",
  "flag": "🇺🇸",
  "vendor": "Visa",
  "type": "Credit",
  "level": "Classic",
  "bank_name": "JPMorgan Chase Bank, N.A."
}`}</code>
                        </pre>
                        <CopyButton
                          text={`{
  "number": "411111",
  "country": "United States",
  "flag": "🇺🇸",
  "vendor": "Visa",
  "type": "Credit",
  "level": "Classic",
  "bank_name": "JPMorgan Chase Bank, N.A."
}`}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Response Fields</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Field</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">number</TableCell>
                            <TableCell>string</TableCell>
                            <TableCell>The BIN/IIN number</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">country</TableCell>
                            <TableCell>string</TableCell>
                            <TableCell>The country where the card was issued</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">flag</TableCell>
                            <TableCell>string</TableCell>
                            <TableCell>The country flag emoji</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">vendor</TableCell>
                            <TableCell>string</TableCell>
                            <TableCell>The card network (Visa, Mastercard, etc.)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">type</TableCell>
                            <TableCell>string</TableCell>
                            <TableCell>The card type (Credit, Debit, Prepaid)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">level</TableCell>
                            <TableCell>string</TableCell>
                            <TableCell>The card level (Classic, Gold, Platinum, etc.)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">bank_name</TableCell>
                            <TableCell>string</TableCell>
                            <TableCell>The issuing bank or financial institution</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Error Responses</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Status Code</TableHead>
                            <TableHead>Error Message</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>400</TableCell>
                            <TableCell>BIN parameter is required</TableCell>
                            <TableCell>The bin parameter was not provided</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>404</TableCell>
                            <TableCell>BIN not found</TableCell>
                            <TableCell>The requested BIN was not found in the database</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>429</TableCell>
                            <TableCell>Rate limit exceeded</TableCell>
                            <TableCell>You've exceeded the rate limit for API requests</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>500</TableCell>
                            <TableCell>Failed to process BIN request</TableCell>
                            <TableCell>An internal server error occurred</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="bulk">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">POST /api/bulk-bin</h3>
                        <Badge className="bg-blue-600">POST</Badge>
                      </div>
                      <p className="text-muted-foreground mt-2 mb-4">
                        Retrieve information about multiple BINs in a single request.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Request Body</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Parameter</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Required</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">bins</TableCell>
                            <TableCell>array</TableCell>
                            <TableCell>Yes</TableCell>
                            <TableCell>Array of BINs to look up (max 50)</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Example Request</h4>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto font-mono text-sm">
                          <code>{`curl -X POST https://binsapi.vercel.app/api/bulk-bin \\
  -H "Content-Type: application/json" \\
  -d '{"bins": ["411111", "511111", "371111"]}'`}</code>
                        </pre>
                        <CopyButton
                          text={`curl -X POST https://binsapi.vercel.app/api/bulk-bin \\
  -H "Content-Type: application/json" \\
  -d '{"bins": ["411111", "511111", "371111"]}'`}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Example Response</h4>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto font-mono text-sm">
                          <code>{`{
  "results": [
    {
      "number": "411111",
      "country": "United States",
      "flag": "🇺🇸",
      "vendor": "Visa",
      "type": "Credit",
      "level": "Classic",
      "bank_name": "JPMorgan Chase Bank, N.A."
    },
    {
      "number": "511111",
      "country": "United States",
      "flag": "🇺🇸",
      "vendor": "Mastercard",
      "type": "Credit",
      "level": "Standard",
      "bank_name": "Citibank, N.A."
    },
    {
      "number": "371111",
      "country": "United States",
      "flag": "🇺🇸",
      "vendor": "American Express",
      "type": "Credit",
      "level": "Premium",
      "bank_name": "American Express Company"
    }
  ]
}`}</code>
                        </pre>
                        <CopyButton
                          text={`{
  "results": [
    {
      "number": "411111",
      "country": "United States",
      "flag": "🇺🇸",
      "vendor": "Visa",
      "type": "Credit",
      "level": "Classic",
      "bank_name": "JPMorgan Chase Bank, N.A."
    },
    {
      "number": "511111",
      "country": "United States",
      "flag": "🇺🇸",
      "vendor": "Mastercard",
      "type": "Credit",
      "level": "Standard",
      "bank_name": "Citibank, N.A."
    },
    {
      "number": "371111",
      "country": "United States",
      "flag": "🇺🇸",
      "vendor": "American Express",
      "type": "Credit",
      "level": "Premium",
      "bank_name": "American Express Company"
    }
  ]
}`}
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Error Responses</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Status Code</TableHead>
                            <TableHead>Error Message</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>400</TableCell>
                            <TableCell>Valid BINs array is required</TableCell>
                            <TableCell>The bins parameter was not provided or is invalid</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>400</TableCell>
                            <TableCell>Maximum 50 BINs allowed at once</TableCell>
                            <TableCell>You've exceeded the maximum number of BINs per request</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>429</TableCell>
                            <TableCell>Rate limit exceeded</TableCell>
                            <TableCell>You've exceeded the rate limit for API requests</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>500</TableCell>
                            <TableCell>Failed to process bulk BIN request</TableCell>
                            <TableCell>An internal server error occurred</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-2 shadow-lg overflow-hidden">
            <CardHeader className="pb-4 bg-muted/30">
              <CardTitle className="text-2xl">Code Examples</CardTitle>
              <CardDescription>Implementation examples in various programming languages</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="javascript" className="w-full">
                <TabsList className="mb-6 flex flex-wrap">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="php">PHP</TabsTrigger>
                  <TabsTrigger value="ruby">Ruby</TabsTrigger>
                </TabsList>

                <TabsContent value="javascript">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto font-mono text-sm">
                      <code>{`// Using fetch API
async function checkBin(bin) {
  try {
    const response = await fetch(\`https://binsapi.vercel.app/api/bin?bin=\${bin}\`);
    
    if (!response.ok) {
      throw new Error(\`Error: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Failed to check BIN:', error);
  }
}

// Example usage
checkBin('411111');`}</code>
                    </pre>
                    <CopyButton
                      text={`// Using fetch API
async function checkBin(bin) {
  try {
    const response = await fetch(\`https://binsapi.vercel.app/api/bin?bin=\${bin}\`);
    
    if (!response.ok) {
      throw new Error(\`Error: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Failed to check BIN:', error);
  }
}

// Example usage
checkBin('411111');`}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="python">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto font-mono text-sm">
                      <code>{`import requests

def check_bin(bin_number):
    url = f"https://binsapi.vercel.app/api/bin?bin={bin_number}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        
        data = response.json()
        print(data)
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error checking BIN: {e}")
        return None

# Example usage
check_bin("411111")`}</code>
                    </pre>
                    <CopyButton
                      text={`import requests

def check_bin(bin_number):
    url = f"https://binsapi.vercel.app/api/bin?bin={bin_number}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        
        data = response.json()
        print(data)
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error checking BIN: {e}")
        return None

# Example usage
check_bin("411111")`}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="php">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto font-mono text-sm">
                      <code>{`<?php
function checkBin($bin) {
    $url = "https://binsapi.vercel.app/api/bin?bin=" . urlencode($bin);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode >= 200 && $httpCode < 300) {
        $data = json_decode($response, true);
        print_r($data);
        return $data;
    } else {
        echo "Error checking BIN: HTTP code " . $httpCode;
        return null;
    }
}

// Example usage
checkBin("411111");
?>`}</code>
                    </pre>
                    <CopyButton
                      text={`<?php
function checkBin($bin) {
    $url = "https://binsapi.vercel.app/api/bin?bin=" . urlencode($bin);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode >= 200 && $httpCode < 300) {
        $data = json_decode($response, true);
        print_r($data);
        return $data;
    } else {
        echo "Error checking BIN: HTTP code " . $httpCode;
        return null;
    }
}

// Example usage
checkBin("411111");
?>`}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="ruby">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto font-mono text-sm">
                      <code>{`require 'net/http'
require 'json'

def check_bin(bin)
  uri = URI("https://binsapi.vercel.app/api/bin?bin=#{bin}")
  
  begin
    response = Net::HTTP.get_response(uri)
    
    if response.code.to_i >= 200 && response.code.to_i < 300
      data = JSON.parse(response.body)
      puts data
      return data
    else
      puts "Error checking BIN: HTTP code #{response.code}"
      return nil
    end
  rescue => e
    puts "Error checking BIN: #{e.message}"
    return nil
  end
end

# Example usage
check_bin("411111")`}</code>
                    </pre>
                    <CopyButton
                      text={`require 'net/http'
require 'json'

def check_bin(bin)
  uri = URI("https://binsapi.vercel.app/api/bin?bin=#{bin}")
  
  begin
    response = Net::HTTP.get_response(uri)
    
    if response.code.to_i >= 200 && response.code.to_i < 300
      data = JSON.parse(response.body)
      puts data
      return data
    else
      puts "Error checking BIN: HTTP code #{response.code}"
      return nil
    end
  rescue => e
    puts "Error checking BIN: #{e.message}"
    return nil
  end
end

# Example usage
check_bin("411111")`}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl">Need More Power?</CardTitle>
              <CardDescription>
                Upgrade to our premium API for higher rate limits and additional features
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-2">Premium API Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    <span>Higher rate limits (up to 10,000 requests per hour)</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    <span>Additional data fields (issuer phone, website, etc.)</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    <span>Dedicated support and SLA guarantees</span>
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    <span>Webhook notifications for database updates</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center">
                <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  Contact Us for Premium Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
      onClick={copyToClipboard}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}

