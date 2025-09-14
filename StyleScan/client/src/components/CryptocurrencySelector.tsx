import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bitcoin, DollarSign, Coins, Crown } from "lucide-react";

export interface CryptocurrencyOption {
  id: "bitcoin" | "ethereum" | "dogecoin" | "gold";
  name: string;
  symbol: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface CryptocurrencySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const cryptocurrencyOptions: CryptocurrencyOption[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    icon: Bitcoin,
  },
  {
    id: "ethereum", 
    name: "Ethereum",
    symbol: "ETH",
    icon: DollarSign,
  },
  {
    id: "dogecoin",
    name: "Dogecoin", 
    symbol: "DOGE",
    icon: Coins,
  },
  {
    id: "gold",
    name: "Gold",
    symbol: "XAU",
    icon: Crown,
  },
];

export default function CryptocurrencySelector({ value, onValueChange }: CryptocurrencySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Cryptocurrency
      </label>
      <Select value={value} onValueChange={onValueChange} data-testid="select-cryptocurrency">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select cryptocurrency" />
        </SelectTrigger>
        <SelectContent>
          {cryptocurrencyOptions.map((crypto) => {
            const IconComponent = crypto.icon;
            return (
              <SelectItem key={crypto.id} value={crypto.id}>
                <div className="flex items-center gap-3">
                  <IconComponent className="h-4 w-4 text-primary" />
                  <span className="font-medium">{crypto.name}</span>
                  <span className="text-sm text-muted-foreground">({crypto.symbol})</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}