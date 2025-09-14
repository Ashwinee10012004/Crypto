import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { forecastRequestSchema } from "@shared/schema";
import { readFile } from "fs/promises";
import { join } from "path";
import { loadGoldActualData, getDateRangeOverlap, type GoldActualData } from "./csvProcessor";

export async function registerRoutes(app: Express): Promise<Server> {
  // Forecast generation endpoint
  app.post("/api/forecast", async (req, res) => {
    try {
      const request = forecastRequestSchema.parse(req.body);
      
      // Additional server-side validation
      const start = new Date(request.startDate);
      const end = new Date(request.endDate);
      const minDate = new Date("2025-08-09");
      const maxDate = new Date("2029-12-31");
      
      if (start >= end) {
        return res.status(400).json({ error: "End date must be after start date" });
      }
      
      if (start < minDate || end > maxDate) {
        return res.status(400).json({ error: "Dates must be between August 9, 2025 and December 31, 2029" });
      }
      
      const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff > 365) {
        return res.status(400).json({ error: "Forecast period cannot exceed 1 year" });
      }
      
      // Handle gold with hybrid data approach
      let filteredData: any[] = [];
      
      if (request.cryptocurrency === "gold") {
        // For gold, use hybrid approach with CSV + Prophet data
        const overlap = getDateRangeOverlap(start, end);
        
        if (overlap.hasActualData) {
          // Load CSV data for accurate prices
          const actualData = await loadGoldActualData();
          const actualFiltered = actualData.filter((item: GoldActualData) => {
            const itemDate = new Date(item.ds);
            return itemDate >= start && itemDate <= end;
          });
          filteredData.push(...actualFiltered);
        }
        
        if (overlap.hasProphetData) {
          // Load Prophet data for forecasted prices
          try {
            const prophetFilePath = join(process.cwd(), "client", "public", "gold_forecast.json");
            const prophetContent = await readFile(prophetFilePath, "utf-8");
            const prophetData = JSON.parse(prophetContent);
            
            const prophetFiltered = prophetData.filter((item: any) => {
              const itemDate = new Date(item.ds);
              // Only use Prophet data for dates outside the CSV range
              const csvStart = new Date("2025-08-13");
              const csvEnd = new Date("2025-09-12");
              const isOutsideCsvRange = itemDate < csvStart || itemDate > csvEnd;
              return isOutsideCsvRange && itemDate >= start && itemDate <= end;
            });
            filteredData.push(...prophetFiltered);
          } catch (prophetError) {
            console.error("Failed to load Prophet gold data:", prophetError);
            return res.status(500).json({ error: "Failed to load gold forecast data" });
          }
        }
        
        // Sort combined data by date
        filteredData.sort((a, b) => new Date(a.ds).getTime() - new Date(b.ds).getTime());
        
      } else {
        // For other cryptocurrencies, use standard JSON approach
        const fileMap: Record<string, string> = {
          bitcoin: "crypto_forecast.json",
          ethereum: "eth_forecast.json", 
          dogecoin: "doge_forecast.json"
        };

        const fileName = fileMap[request.cryptocurrency];
        if (!fileName) {
          return res.status(400).json({ error: `Unsupported cryptocurrency: ${request.cryptocurrency}` });
        }

        const filePath = join(process.cwd(), "client", "public", fileName);
        
        try {
          const fileContent = await readFile(filePath, "utf-8");
          const allData = JSON.parse(fileContent);
          
          // Filter data by date range
          filteredData = allData.filter((item: any) => {
            const itemDate = new Date(item.ds);
            return itemDate >= start && itemDate <= end;
          });
        } catch (fileError) {
          console.error(`Failed to read ${fileName}:`, fileError);
          return res.status(500).json({ error: `Failed to load ${request.cryptocurrency} forecast data` });
        }
      }

      if (filteredData.length === 0) {
        return res.status(400).json({ error: "No forecast data available for the specified date range" });
      }

      const currentPrice = filteredData[0]?.yhat || 0;
      const predictedPrice = filteredData[filteredData.length - 1]?.yhat || 0;
      const priceChange = predictedPrice - currentPrice;
      const priceChangePercent = currentPrice > 0 ? (priceChange / currentPrice) * 100 : 0;

      const response = {
        cryptocurrency: request.cryptocurrency,
        dateRange: { 
          start: request.startDate, 
          end: request.endDate 
        },
        currentPrice,
        predictedPrice,
        priceChange,
        priceChangePercent,
        data: filteredData
      };

      res.json(response);
    } catch (error) {
      console.error("Forecast generation error:", error);
      
      if (error instanceof Error && error.message.includes("Invalid")) {
        return res.status(400).json({ error: error.message });
      }
      
      res.status(500).json({ error: "Internal server error while generating forecast" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
