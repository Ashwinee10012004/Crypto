import { useState } from "react";
import DateRangePicker from "../DateRangePicker";

export default function DateRangePickerExample() {
  const [startDate, setStartDate] = useState("2025-08-09");
  const [endDate, setEndDate] = useState("2025-08-15");

  return (
    <div className="p-6 bg-card rounded-lg border max-w-sm">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
    </div>
  );
}