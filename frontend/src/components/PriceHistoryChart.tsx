import type { PricePoint } from "../types";
import { formatPrice, formatDate } from "../utils/format";
import { useMemo } from "react";

interface Props {
  history: PricePoint[];
}

function getMinMax(points: PricePoint[]) {
  if (!points.length) return { min: 0, max: 0 };
  const prices = points.map((p) => parseFloat(p.price));
  return { min: Math.min(...prices), max: Math.max(...prices) };
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
      <h3 className="text-lg font-semibold text-gray-900">Histórico de preços</h3>
      <div className="space-y-4">
        {platforms.map((platform) => {
          const points = sorted.filter((p) => p.platform === platform);
          if (points.length < 2) return null;
          const { min, max } = getMinMax(points);
          const range = max - min || 1;

          return (
            <div key={platform} className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">{platform}</p>
              <div className="flex items-end gap-1 h-24">
                {points.map((point, i) => {
                  const height = ((parseFloat(point.price) - min) / range) * 80 + 10;
                  return (
                    <div
                      key={i}
                      title={`${formatDate(point.timestamp)} - ${formatPrice(point.price)}`}
                      className="flex-1 bg-blue-400 rounded-t min-h-[4px] hover:bg-blue-600 transition-colors relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
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
