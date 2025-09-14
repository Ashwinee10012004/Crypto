import { z } from "zod";

// Cryptocurrency forecast data structure
export const forecastDataSchema = z.object({
  ds: z.string(), // Date string in ISO format
  yhat: z.number(), // Predicted price
});

export type ForecastData = z.infer<typeof forecastDataSchema>;

// Cryptocurrency configuration
export const cryptoConfigSchema = z.object({
  id: z.enum(["bitcoin", "ethereum", "dogecoin", "gold"]),
  name: z.string(),
  symbol: z.string(),
  dataFile: z.string(),
});

export type CryptoConfig = z.infer<typeof cryptoConfigSchema>;

// Forecast request schema
export const forecastRequestSchema = z.object({
  cryptocurrency: z.enum(["bitcoin", "ethereum", "dogecoin", "gold"]),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
});

export type ForecastRequest = z.infer<typeof forecastRequestSchema>;

// Forecast response schema
export const forecastResponseSchema = z.object({
  cryptocurrency: z.string(),
  dateRange: z.object({
    start: z.string(),
    end: z.string(),
  }),
  currentPrice: z.number(),
  predictedPrice: z.number(),
  priceChange: z.number(),
  priceChangePercent: z.number(),
  data: z.array(forecastDataSchema),
});

export type ForecastResponse = z.infer<typeof forecastResponseSchema>;
