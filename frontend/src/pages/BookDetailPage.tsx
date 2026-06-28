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

  if (bookLoading || pricesLoading) return <Loading text="Carregando detalhes..." />;
  if (bookError || !book) return <ErrorState message={bookError || "Livro não encontrado"} />;

  return (
    <Layout title={book.title} subtitle={book.author}>
      <button
        onClick={onBack}
        className="mb-6 text-sm text-blue-600 hover:text-blue-800 transition-colors"
      >
        ← Voltar para busca
      </button>

      <div className="space-y-8">
        {prices && <PriceComparison prices={prices.currentPrices} />}
        {pricesError && <ErrorState message={pricesError} />}
        {prices && prices.history.length > 0 && (
          <PriceHistoryChart history={prices.history} />
        )}
      </div>
    </Layout>
  );
}
