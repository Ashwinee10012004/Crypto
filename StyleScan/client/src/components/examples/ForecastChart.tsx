import ForecastChart from "../ForecastChart";

// Todo: remove mock functionality
const mockData = [
  { ds: "2025-08-09T00:00:00.000", yhat: 107227.63 },
  { ds: "2025-08-10T00:00:00.000", yhat: 107268.74 },
  { ds: "2025-08-11T00:00:00.000", yhat: 107313.03 },
  { ds: "2025-08-12T00:00:00.000", yhat: 107420.42 },
  { ds: "2025-08-13T00:00:00.000", yhat: 107448.66 },
  { ds: "2025-08-14T00:00:00.000", yhat: 107584.00 },
  { ds: "2025-08-15T00:00:00.000", yhat: 107572.73 },
];

export default function ForecastChartExample() {
  return (
    <div className="p-6 bg-card rounded-lg border">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Price Forecast Visualization</h3>
          <p className="text-sm text-muted-foreground">Prophet ML model predictions with trend analysis</p>
        </div>
        <ForecastChart data={mockData} cryptocurrency="bitcoin" />
      </div>
    </div>
  );
}