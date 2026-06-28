import { useState, useEffect } from "react";
import { getPrices } from "../api/prices";
import type { PriceDetail } from "../types";

export function usePrices(isbn: string | undefined) {
  const [prices, setPrices] = useState<PriceDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isbn) return;
    setLoading(true);
    setError("");
    getPrices(isbn)
      .then(setPrices)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [isbn]);

  return { prices, loading, error };
}
