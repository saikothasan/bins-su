## How to Use the BIN Checker

This BIN checker application allows users to search for information about bank identification numbers (BINs) using the CSV data stored in your public folder. Here's how it works:

1. The application reads the `bins_all.csv` file from the public folder
2. Users can enter the first 6-8 digits of a card number (the BIN) in the search field
3. The API searches the CSV file for matching records and returns the information
4. The results display the card's country, flag, vendor, type, level, and bank name


### Implementation Details

1. **Frontend**: A clean, responsive interface with a search input and results display
2. **API Endpoint**: A server-side route that handles BIN lookup requests
3. **CSV Parsing**: Server-side logic to read and search the CSV file efficiently


### Next Steps

To complete the setup:

1. Make sure your `bins_all.csv` file is placed in the `public` folder of your Next.js project
2. The CSV should have the exact column structure: `number,country,flag,vendor,type,level,bank_name`
3. Deploy your application to make it accessible online
