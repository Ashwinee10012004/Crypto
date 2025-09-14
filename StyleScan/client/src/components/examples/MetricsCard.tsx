import MetricsCard from "../MetricsCard";
import { DollarSign, Target, TrendingUp, Calendar } from "lucide-react";

export default function MetricsCardExample() {
  return (
    <div className="grid grid-cols-2 gap-4 p-6 bg-background">
      <MetricsCard
        icon={DollarSign}
        label="Current Price"
        value="$107,227.63"
        testId="text-current-price"
      />
      <MetricsCard
        icon={Target}
        label="Predicted Price"
        value="$108,666.31"
        isPositive={true}
        testId="text-predicted-price"
      />
      <MetricsCard
        icon={TrendingUp}
        label="Forecast Change"
        value="+1.34%"
        isPositive={true}
        testId="text-price-change"
      />
      <MetricsCard
        icon={Calendar}
        label="Forecast Period"
        value="Aug 9–31, 2025"
        testId="text-date-range"
      />
    </div>
  );
}