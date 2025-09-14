import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate = "2025-08-09",
  maxDate = "2029-12-31"
}: DateRangePickerProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="start-date" className="text-sm font-medium">
          Start Date
        </Label>
        <Input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          min={minDate}
          max={endDate || maxDate}
          data-testid="input-start-date"
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="end-date" className="text-sm font-medium">
          End Date
        </Label>
        <Input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          min={startDate || minDate}
          max={maxDate}
          data-testid="input-end-date"
          className="w-full"
        />
      </div>
      
      {startDate && endDate && (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground" data-testid="text-forecast-period">
            Showing forecast from {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
}

