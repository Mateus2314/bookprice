import { useState, useEffect } from "react";
import { getBookByIsbn } from "../api/books";
import type { SearchResult } from "../types";

export function useBook(isbn: string | undefined) {
  const [book, setBook] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isbn) return;
    setLoading(true);
    setError("");
    getBookByIsbn(isbn)
      .then(setBook)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [isbn]);

  return { book, loading, error };
}
