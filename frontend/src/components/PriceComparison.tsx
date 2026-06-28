import type { PriceInfo } from "../types";

interface Props {
  prices: PriceInfo[];
}

export default function PriceComparison({ prices }: Props) {
  if (!prices.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Onde comprar</h3>
      <div className="grid gap-3">
        {prices.map((price, i) => (
          <a
            key={i}
            href={price.affiliateUrl || price.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <span className="font-medium text-gray-700">{price.platformName}</span>
            <span className="text-lg font-bold text-green-600">
              R$ {parseFloat(price.price).toFixed(2)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
