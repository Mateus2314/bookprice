import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookResults from "./components/BookResults";
import type { SearchResult } from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8787";

function App() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(query: string) {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Erro ao buscar livros");
      const data = await res.json();
      setResults(data.results);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            BookPrice
          </h1>
          <p className="text-gray-500 mt-1">
            Compare preços de livros e encontre o melhor desconto
          </p>
          <div className="mt-6">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        {loading ? (
          <div className="text-center py-12 text-gray-400">
            Buscando melhores preços...
          </div>
        ) : (
          <BookResults results={results} />
        )}
      </main>
    </div>
  );
}

export default App;
