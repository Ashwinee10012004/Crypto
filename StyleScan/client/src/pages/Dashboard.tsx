import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Settings, PlayCircle, DollarSign, Target, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

import CryptocurrencySelector from "@/components/CryptocurrencySelector";
import DateRangePicker from "@/components/DateRangePicker";
import MetricsCard from "@/components/MetricsCard";
import ForecastChart from "@/components/ForecastChart";
import ForecastTable from "@/components/ForecastTable";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

import type { ForecastResponse } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();
  
  // Form state
  const [cryptocurrency, setCryptocurrency] = useState("bitcoin");
  const [startDate, setStartDate] = useState("2025-08-09");
  const [endDate, setEndDate] = useState("2025-08-15");
  
  // Forecast state
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(null);

  // Generate forecast mutation
  const generateForecast = useMutation({
    mutationFn: async (params: { cryptocurrency: string; startDate: string; endDate: string }) => {
      const response = await fetch("/api/forecast", {
        method: "POST",
        body: JSON.stringify(params),
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate forecast");
      }
      
      return response.json();
    },
    onSuccess: (data: ForecastResponse) => {
      setForecastData(data);
      toast({
        title: "Forecast Generated",
        description: `Successfully generated ${data.cryptocurrency} price forecast.`,
      });
    },
    onError: (error: any) => {
      console.error("Forecast error:", error);
      toast({
        title: "Forecast Failed",
        description: error.message || "Failed to generate forecast. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerateForecast = () => {
    // Validate dates are selected
    if (!startDate || !endDate) {
      toast({
        title: "Invalid Date Range",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
      return;
    }

    // Validate date order
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      toast({
        title: "Invalid Date Range",
        description: "End date must be after start date.",
        variant: "destructive",
      });
      return;
    }

    // Validate dates are within available data range (2025-2029)
    const minDate = new Date("2025-08-09");
    const maxDate = new Date("2029-12-31");
    
    if (start < minDate || end > maxDate) {
      toast({
        title: "Date Out of Range",
        description: "Please select dates between August 9, 2025 and December 31, 2029.",
        variant: "destructive",
      });
      return;
    }

    // Validate reasonable forecast period (not too long)
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 365) {
      toast({
        title: "Forecast Period Too Long",
        description: "Please select a forecast period of 1 year or less for optimal accuracy.",
        variant: "destructive",
      });
      return;
    }

    generateForecast.mutate({ cryptocurrency, startDate, endDate });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? "+" : "";
    return `${sign}${percentage.toFixed(2)}%`;
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startFormatted = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const endFormatted = endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return `${startFormatted}–${endFormatted}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center text-center space-x-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Crypto Forecast Dashboard</h1>
              <p className="text-lg text-muted-foreground">Prophet ML Model • Price Predictions</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Configuration */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
                  Forecast Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Cryptocurrency Selection */}
                <CryptocurrencySelector
                  value={cryptocurrency}
                  onValueChange={setCryptocurrency}
                />
                
                {/* Date Range Selection */}
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                />
                
                {/* Generate Button */}
                <Button
                  onClick={handleGenerateForecast}
                  disabled={generateForecast.isPending}
                  className="w-full"
                  data-testid="button-generate-forecast"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  {generateForecast.isPending ? "Generating..." : "Generate Forecast"}
                </Button>
                
              </CardContent>
            </Card>
          </aside>

          {/* Right Content - Results */}
          <section className="lg:col-span-3 space-y-6">
            
            {/* Loading State */}
            {generateForecast.isPending && (
              <Card>
                <CardContent className="p-8">
                  <LoadingState />
                </CardContent>
              </Card>
            )}

            {/* Error State */}
            {generateForecast.isError && (
              <Card>
                <CardContent className="p-8">
                  <ErrorState 
                    message={generateForecast.error?.message || "Failed to generate forecast"}
                    onRetry={() => generateForecast.mutate({ cryptocurrency, startDate, endDate })}
                  />
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {forecastData && !generateForecast.isPending && (
              <>
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  <MetricsCard
                    icon={DollarSign}
                    label="Current Price"
                    value={formatCurrency(forecastData.currentPrice)}
                    testId="text-current-price"
                  />
                  <MetricsCard
                    icon={Target}
                    label="Predicted Price"
                    value={formatCurrency(forecastData.predictedPrice)}
                    testId="text-predicted-price"
                  />
                  <MetricsCard
                    icon={TrendingUp}
                    label="Forecast Change"
                    value={formatPercentage(forecastData.priceChangePercent)}
                    isPositive={forecastData.priceChangePercent >= 0}
                    testId="text-price-change"
                  />
                  <MetricsCard
                    icon={Calendar}
                    label="Forecast Period"
                    value={formatDateRange(forecastData.dateRange.start, forecastData.dateRange.end)}
                    testId="text-date-range"
                  />
                </div>

                {/* Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Price Forecast Visualization</CardTitle>
                    <p className="text-sm text-muted-foreground">Prophet ML model predictions with trend analysis</p>
                  </CardHeader>
                  <CardContent>
                    <ForecastChart 
                      data={forecastData.data} 
                      cryptocurrency={forecastData.cryptocurrency} 
                    />
                  </CardContent>
                </Card>

                {/* Data Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Forecast Data Table</CardTitle>
                    <p className="text-sm text-muted-foreground">Detailed daily predictions from Prophet model</p>
                  </CardHeader>
                  <CardContent>
                    <ForecastTable data={forecastData.data} />
                  </CardContent>
                </Card>
              </>
            )}

          </section>
        </div>
      </main>
    </div>
  );
}