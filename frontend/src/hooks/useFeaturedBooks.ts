import { useState, useEffect } from "react";
import { getFeaturedBooks } from "../api/books";
import type { SearchResult } from "../types";

export function useFeaturedBooks() {
  const [books, setBooks] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getFeaturedBooks()
      .then((data) => setBooks(data.results))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { books, loading, error };
}
