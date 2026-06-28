import type { PriceInfo } from "../types";
import { formatPrice } from "../utils/format";

interface Props {
  prices: PriceInfo[];
}

export default function PriceComparison({ prices }: Props) {
  if (!prices.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-title">Onde comprar</h3>
      <div className="space-y-2">
        {prices.map((price, i) => (
          <a
            key={i}
            href={price.affiliateUrl || price.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border hover:border-accent hover:bg-card-hover transition-colors"
          >
            <span className="text-sm font-medium text-title">{price.platformName}</span>
            <span className="text-sm font-bold text-emerald">{formatPrice(price.price)}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
