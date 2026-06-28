import type { SearchResult } from "../types";
import { formatPrice } from "../utils/format";

interface Props {
  book: SearchResult;
  onClick?: () => void;
}

export default function ResultCard({ book, onClick }: Props) {
  const storeCount = book.prices?.length || 0;
  const bestPrice = book.bestPrice?.price;

  return (
    <div
      className="flex gap-4 bg-card border border-border rounded-2xl p-4 cursor-pointer hover:bg-card-hover transition-colors"
      onClick={onClick}
    >
      {book.imageUrl ? (
        <img src={book.imageUrl} alt={book.title} className="w-20 h-[120px] object-contain rounded-xl shrink-0" />
      ) : (
        <div className="w-20 h-[120px] rounded-xl bg-accent-dim flex items-center justify-center shrink-0">
          <span className="text-body text-xs">{book.title.charAt(0)}</span>
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
        <div>
          <p className="text-sm font-semibold text-title leading-tight line-clamp-2">
            {book.title}
          </p>
          <p className="text-[11px] text-body mt-1 truncate">{book.author}</p>
        </div>
        <div className="flex items-center gap-2">
          {bestPrice && (
            <span className="text-sm font-bold text-price">{formatPrice(bestPrice)}</span>
          )}
          {storeCount > 0 && (
            <span className="text-[10px] font-semibold text-body bg-accent-dim/30 px-2 py-0.5 rounded">
              {storeCount} {storeCount === 1 ? "loja" : "lojas"}
            </span>
          )}
        </div>
      </div>
      <svg className="w-5 h-5 text-body shrink-0 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}
