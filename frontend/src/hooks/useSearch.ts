import { useState, useCallback } from "react";
import { searchBooks } from "../api/books";
import type { SearchResult } from "../types";

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = await searchBooks(query);
      setResults(data.results);
    } catch (e: any) {
      setError(e.message || "Erro ao buscar livros");
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResults([]);
    setError("");
  }, []);

  return { results, loading, error, search, clear };
}
