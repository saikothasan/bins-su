import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

// Define the structure of our bin data
interface BinData {
  number: string
  country: string
  flag: string
  vendor: string
  type: string
  level: string
  bank_name: string
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const bin = searchParams.get("bin")

  if (!bin) {
    return NextResponse.json({ error: "BIN parameter is required" }, { status: 400 })
  }

  try {
    // Read the CSV file
    const filePath = path.join(process.cwd(), "public", "bins_all.csv")
    const fileContent = fs.readFileSync(filePath, "utf8")

    // Parse the CSV content
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    }) as BinData[]

    // Find the matching bin
    const result = records.find((record) => record.number.startsWith(bin))

    if (!result) {
      return NextResponse.json({ error: "BIN not found" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing BIN request:", error)
    return NextResponse.json({ error: "Failed to process BIN request" }, { status: 500 })
  }
}

