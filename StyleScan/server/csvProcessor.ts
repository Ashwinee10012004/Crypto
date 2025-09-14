import { readFile } from 'fs/promises';
import { join } from 'path';

export interface GoldActualData {
  ds: string;
  yhat: number;
}

export async function loadGoldActualData(): Promise<GoldActualData[]> {
  try {
    const csvPath = join(process.cwd(), "client", "public", "gold_actual_data.csv");
    const csvContent = await readFile(csvPath, "utf-8");
    
    const lines = csvContent.trim().split('\n');
    const data: GoldActualData[] = [];
    
    for (const line of lines) {
      // Handle quoted CSV format: "12-09-2025","3,686.40"
      // Use regex to properly extract quoted fields
      const matches = line.match(/"([^"]*)"/g);
      
      if (matches && matches.length >= 2) {
        const dateStr = matches[0].replace(/"/g, ''); // Format: "12-09-2025"
        const priceStr = matches[1].replace(/"/g, ''); // Format: "3,686.40"
        
        // Convert date from DD-MM-YYYY to YYYY-MM-DD
        const [day, month, year] = dateStr.split('-');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.000`;
        
        // Convert price from "3,686.40" to 3686.40
        const price = parseFloat(priceStr.replace(/,/g, ''));
        
        if (!isNaN(price) && year && month && day) {
          data.push({
            ds: formattedDate,
            yhat: price
          });
        }
      }
    }
    
    // Sort by date (newest first in CSV, so reverse to get chronological order)
    data.sort((a, b) => new Date(a.ds).getTime() - new Date(b.ds).getTime());
    
    return data;
  } catch (error) {
    console.error("Failed to load gold actual data:", error);
    return [];
  }
}

function isDateInActualRange(date: Date): boolean {
  const start = new Date("2025-08-13");
  const end = new Date("2025-09-12");
  return date >= start && date <= end;
}

export function getDateRangeOverlap(startDate: Date, endDate: Date) {
  const actualStart = new Date("2025-08-13");
  const actualEnd = new Date("2025-09-12");
  
  // Check if requested range overlaps with actual data range
  const hasActualData = startDate <= actualEnd && endDate >= actualStart;
  
  // Check if requested range extends beyond actual data range
  const hasProphetData = startDate < actualStart || endDate > actualEnd;
  
  return {
    hasActualData,
    hasProphetData
  };
}