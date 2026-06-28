import { useBook } from "../hooks/useBook";
import { usePrices } from "../hooks/usePrices";
import Layout from "../components/Layout";
import PriceComparison from "../components/PriceComparison";
import PriceHistoryChart from "../components/PriceHistoryChart";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";

interface Props {
  isbn: string;
  onBack: () => void;
}

export default function BookDetailPage({ isbn, onBack }: Props) {
  const { book, loading: bookLoading, error: bookError } = useBook(isbn);
  const { prices, loading: pricesLoading, error: pricesError } = usePrices(isbn);

  if (bookLoading || pricesLoading) return (
    <Layout><Loading text="Carregando detalhes..." /></Layout>
  );

  if (bookError || !book) return (
    <Layout><ErrorState message={bookError || "Livro não encontrado"} /></Layout>
  );

  return (
    <Layout>
      <div className="px-4 pt-4 pb-2">
        <button onClick={onBack} className="flex items-center gap-1 text-xs text-body hover:text-accent transition-colors mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para busca
        </button>

        <div className="flex gap-4">
          <div className="w-24 h-36 shrink-0 rounded-xl overflow-hidden bg-card">
            {book.imageUrl ? (
              <img src={book.imageUrl} alt={book.title} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-accent-dim">
                <span className="text-body text-xs">{book.title.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-title">{book.title}</h1>
            <p className="text-xs text-body mt-1">{book.author}</p>
            {book.publisher && (
              <p className="text-[11px] text-body/60 mt-0.5">{book.publisher}</p>
            )}
            {book.bestPrice && (
              <div className="mt-3 inline-block bg-success-bg text-success-text text-xs font-semibold px-3 py-1 rounded-lg">
                Menor preço: R$ {parseFloat(book.bestPrice.price).toFixed(2)} em {book.bestPrice.platform}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6 mt-6">
        {prices && <PriceComparison prices={prices.currentPrices} />}
        {pricesError && <ErrorState message={pricesError} />}
        {prices && prices.history.length > 0 && (
          <PriceHistoryChart history={prices.history} />
        )}
      </div>
    </Layout>
  );
}
