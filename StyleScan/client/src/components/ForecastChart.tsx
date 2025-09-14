import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ForecastChartProps {
  data: Array<{ ds: string; yhat: number }>;
  cryptocurrency: string;
}

export default function ForecastChart({ data, cryptocurrency }: ForecastChartProps) {
  const chartData = {
    labels: data.map(item => format(new Date(item.ds), "MMM dd")),
    datasets: [
      {
        label: `${cryptocurrency.charAt(0).toUpperCase() + cryptocurrency.slice(1)} Price Forecast`,
        data: data.map(item => item.yhat),
        borderColor: "hsl(var(--chart-1))",
        backgroundColor: "hsl(var(--chart-1) / 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "hsl(var(--chart-1))",
        pointBorderColor: "hsl(var(--card))",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "hsl(var(--foreground))",
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "hsl(var(--card))",
        titleColor: "hsl(var(--foreground))",
        bodyColor: "hsl(var(--foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
        titleFont: {
          family: "Inter, sans-serif",
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          family: "Inter, sans-serif",
          size: 13,
        },
        callbacks: {
          label: function(context) {
            return `Price: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "hsl(var(--muted-foreground))",
          font: {
            family: "Inter, sans-serif",
            size: 11,
          },
        },
        grid: {
          color: "hsl(var(--border))",
        },
      },
      y: {
        ticks: {
          color: "hsl(var(--muted-foreground))",
          font: {
            family: "Inter, sans-serif",
            size: 11,
          },
          callback: function(tickValue) {
            return `$${Number(tickValue).toLocaleString()}`;
          },
        },
        grid: {
          color: "hsl(var(--border))",
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="h-80">
      <Line data={chartData} options={options} data-testid="chart-forecast" />
    </div>
  );
}