import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  isPositive?: boolean;
  testId?: string;
}

export default function MetricsCard({ 
  icon: Icon, 
  label, 
  value, 
  isPositive, 
  testId 
}: MetricsCardProps) {
  return (
    <Card className="hover-elevate">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-2 mb-2">
          <Icon className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
        <div 
          className={`text-2xl font-bold ${
            isPositive !== undefined 
              ? isPositive 
                ? "text-chart-2" 
                : "text-chart-3"
              : "text-foreground"
          }`}
          data-testid={testId}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}