import type { PricePoint } from "../types";
import { formatPrice, formatDate } from "../utils/format";
import { useMemo } from "react";

interface Props {
  history: PricePoint[];
}

export default function PriceHistoryChart({ history }: Props) {
  const sorted = useMemo(
    () => [...history].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
    [history]
  );

  if (!sorted.length) return null;

  const platforms = [...new Set(sorted.map((p) => p.platform))];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-title">Histórico de preços</h3>
      <div className="space-y-4">
        {platforms.map((platform) => {
          const points = sorted.filter((p) => p.platform === platform);
          if (points.length < 2) return null;
          const prices = points.map((p) => parseFloat(p.price));
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          const range = max - min || 1;

          return (
            <div key={platform} className="bg-card rounded-xl p-4 border border-border">
              <p className="text-sm font-medium text-title mb-3">{platform}</p>
              <div className="flex items-end gap-[2px] h-24">
                {points.map((point, i) => {
                  const height = ((parseFloat(point.price) - min) / range) * 80 + 10;
                  return (
                    <div
                      key={i}
                      title={`${formatDate(point.timestamp)} - ${formatPrice(point.price)}`}
                      className="flex-1 bg-gold/60 rounded-t-sm min-h-[3px] hover:bg-gold transition-colors relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-card-hover text-body text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 border border-border">
                        {formatDate(point.timestamp)}: {formatPrice(point.price)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
