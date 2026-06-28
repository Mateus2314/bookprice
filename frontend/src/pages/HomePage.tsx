import { useState, useEffect } from "react";
import { useSearch } from "../hooks/useSearch";
import { useFeaturedBooks } from "../hooks/useFeaturedBooks";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import SectionRow from "../components/SectionRow";
import BookResults from "../components/BookResults";
import ErrorState from "../components/ErrorState";
import Loading from "../components/Loading";
import type { SearchResult } from "../types";

interface Props {
  onSelectBook?: (book: SearchResult) => void;
}

const sections = [
  { key: "relampago", title: "Ofertas Relâmpago", offset: 0, count: 4 },
  { key: "populares", title: "Mais Populares", offset: 4, count: 4 },
  { key: "precos", title: "Melhores Preços", offset: 8, count: 4 },
  { key: "lancamentos", title: "Lançamentos", offset: 12, count: 4 },
];

export default function HomePage({ onSelectBook }: Props) {
  const { results, loading: searchLoading, error: searchError, search, clear } = useSearch();
  const { books: featured, loading: featuredLoading, error: featuredError } = useFeaturedBooks();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!featuredLoading && featured.length === 0 && !featuredError) {
    }
  }, [featured, featuredLoading, featuredError]);

  function handleSearch(q: string) {
    setQuery(q);
    search(q);
  }

  function handleBack() {
    setQuery("");
    clear();
  }

  if (query && !searchLoading) {
    return (
      <Layout>
        <div className="px-4 pt-4 pb-2">
          <button onClick={handleBack} className="flex items-center gap-1 text-xs text-body hover:text-accent transition-colors mb-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          <SearchBar onSearch={handleSearch} loading={searchLoading} placeholder={query} />
        </div>
        {searchError && <div className="px-4"><ErrorState message={searchError} /></div>}
        {searchLoading && <Loading text="Buscando melhores preços..." />}
        {!searchLoading && <BookResults results={results} onSelect={onSelectBook} />}
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-12 pb-2 px-4">
        <h1 className="text-2xl font-bold text-title">bookprice</h1>
        <p className="text-xs text-body mt-1">Encontre os melhores preços de livros</p>
      </div>
      <div className="px-4 pb-4">
        <SearchBar onSearch={handleSearch} loading={searchLoading} />
      </div>

      {featuredError && <div className="px-4"><ErrorState message={featuredError} /></div>}
      {featuredLoading && <Loading text="Carregando ofertas..." />}

      {!featuredLoading && !featuredError && featured.length > 0 && (
        <>
          {sections.map((section) => {
            const books = featured.slice(section.offset, section.offset + section.count);
            return (
              <SectionRow
                key={section.key}
                title={section.title}
                books={books}
                onSelect={onSelectBook}
              />
            );
          })}
        </>
      )}
    </Layout>
  );
}
