import { useState } from "react";
import CryptocurrencySelector from "../CryptocurrencySelector";

export default function CryptocurrencySelectorExample() {
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");

  return (
    <div className="p-6 bg-card rounded-lg border max-w-sm">
      <CryptocurrencySelector 
        value={selectedCrypto} 
        onValueChange={setSelectedCrypto} 
      />
    </div>
  );
}