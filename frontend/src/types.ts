export interface PriceInfo {
  platformName: string;
  platformSlug: string;
  price: string;
  url: string;
  affiliateUrl: string | null;
  currency: string;
}

export interface SearchResult {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string | null;
  imageUrl: string | null;
  prices: PriceInfo[];
  bestPrice: { platform: string; price: string; affiliateUrl: string | null } | null;
}
