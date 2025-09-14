import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ForecastTableProps {
  data: Array<{ ds: string; yhat: number }>;
}

export default function ForecastTable({ data }: ForecastTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const getPriceChange = (currentPrice: number, previousPrice: number | null) => {
    if (!previousPrice) return null;
    return ((currentPrice - previousPrice) / previousPrice) * 100;
  };

  return (
    <div className="rounded-lg border">
      <Table data-testid="table-forecast-data">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Day</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            const date = new Date(item.ds);
            const previousPrice = index > 0 ? data[index - 1].yhat : null;
            const priceChange = getPriceChange(item.yhat, previousPrice);
            
            return (
              <TableRow key={item.ds} className="hover-elevate">
                <TableCell className="font-medium">
                  {format(date, "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(date, "EEEE")}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatPrice(item.yhat)}
                </TableCell>
                <TableCell className="text-right">
                  {priceChange !== null ? (
                    <div className={`flex items-center justify-end gap-1 ${
                      priceChange >= 0 ? "text-chart-2" : "text-chart-3"
                    }`}>
                      {priceChange >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span className="font-mono text-sm">
                        {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}