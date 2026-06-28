import type { SearchResult } from "../types";
import { formatPrice } from "../utils/format";

interface Props {
  book: SearchResult;
  onClick?: () => void;
}

export default function BookCard({ book, onClick }: Props) {
  const storeCount = book.prices?.length || 0;
  const bestPrice = book.bestPrice?.price;

  return (
    <div
      className="w-[140px] shrink-0 bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:bg-card-hover transition-colors"
      onClick={onClick}
    >
      <div className="w-full aspect-square flex items-center justify-center p-4">
        {book.imageUrl ? (
          <img src={book.imageUrl} alt={book.title} className="w-full h-full object-contain rounded-lg" />
        ) : (
          <div className="w-full h-full rounded-lg bg-accent-dim flex items-center justify-center">
            <span className="text-body text-xs">{book.title.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="px-3 pb-3">
        <p className="text-xs font-semibold text-title leading-tight line-clamp-2">
          {book.title}
        </p>
        <p className="text-[10px] text-body mt-1 truncate">{book.author}</p>
        <div className="flex items-center gap-1 mt-2">
          {bestPrice && (
            <span className="text-sm font-bold text-price">{formatPrice(bestPrice)}</span>
          )}
          {storeCount > 0 && (
            <span className="text-[9px] font-semibold text-price bg-accent-dim/30 px-1.5 py-0.5 rounded ml-auto">
              {storeCount} {storeCount === 1 ? "loja" : "lojas"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
