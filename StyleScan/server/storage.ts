import { type ForecastData, type ForecastResponse } from "@shared/schema";

// Storage interface for cryptocurrency forecast data
export interface IStorage {
  getForecastData(cryptocurrency: string): Promise<ForecastData[]>;
  getFilteredForecast(
    cryptocurrency: string,
    startDate: string,
    endDate: string
  ): Promise<ForecastResponse>;
}

export class MemStorage implements IStorage {
  private forecastCache: Map<string, ForecastData[]>;

  constructor() {
    this.forecastCache = new Map();
  }

  async getForecastData(cryptocurrency: string): Promise<ForecastData[]> {
    const cacheKey = cryptocurrency.toLowerCase();
    
    if (this.forecastCache.has(cacheKey)) {
      return this.forecastCache.get(cacheKey)!;
    }

    // Load data from JSON files based on cryptocurrency
    const fileMap: Record<string, string> = {
      bitcoin: "crypto_forecast.json",
      ethereum: "eth_forecast.json", 
      dogecoin: "doge_forecast.json"
    };

    const fileName = fileMap[cacheKey];
    if (!fileName) {
      throw new Error(`Unsupported cryptocurrency: ${cryptocurrency}`);
    }

    try {
      // In a real implementation, you would load from the file system
      // For now, return empty array as placeholder
      const data: ForecastData[] = [];
      this.forecastCache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw new Error(`Failed to load forecast data for ${cryptocurrency}`);
    }
  }

  async getFilteredForecast(
    cryptocurrency: string,
    startDate: string,
    endDate: string
  ): Promise<ForecastResponse> {
    const allData = await this.getForecastData(cryptocurrency);
    
    const filteredData = allData.filter(item => {
      const itemDate = new Date(item.ds);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return itemDate >= start && itemDate <= end;
    });

    if (filteredData.length === 0) {
      throw new Error("No data available for the specified date range");
    }

    const currentPrice = filteredData[0]?.yhat || 0;
    const predictedPrice = filteredData[filteredData.length - 1]?.yhat || 0;
    const priceChange = predictedPrice - currentPrice;
    const priceChangePercent = currentPrice > 0 ? (priceChange / currentPrice) * 100 : 0;

    return {
      cryptocurrency,
      dateRange: { start: startDate, end: endDate },
      currentPrice,
      predictedPrice,
      priceChange,
      priceChangePercent,
      data: filteredData
    };
  }
}

export const storage = new MemStorage();
