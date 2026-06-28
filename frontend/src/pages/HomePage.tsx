import { useSearch } from "../hooks/useSearch";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import BookResults from "../components/BookResults";
import ErrorState from "../components/ErrorState";
import Loading from "../components/Loading";
import type { SearchResult } from "../types";

interface Props {
  onSelectBook?: (book: SearchResult) => void;
}

export default function HomePage({ onSelectBook }: Props) {
  const { results, loading, error, search } = useSearch();

  return (
    <Layout title="BookPrice" subtitle="Compare preços de livros e encontre o melhor desconto">
      <div className="mb-8">
        <SearchBar onSearch={search} loading={loading} />
      </div>
      {error && <ErrorState message={error} onRetry={() => search("")} />}
      {loading && <Loading text="Buscando melhores preços..." />}
      {!loading && results.length > 0 && (
        <BookResults results={results} onSelect={onSelectBook} />
      )}
    </Layout>
  );
}
