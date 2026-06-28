export interface ScrapedPrice {
  platform: string;
  platformSlug: string;
  title: string;
  price: number;
  url: string;
  affiliateUrl: string;
  currency: string;
  inStock: boolean;
  isbn?: string;
}

export async function scrapeAmazon(isbn: string, associateTag?: string): Promise<ScrapedPrice | null> {
  const url = `https://www.amazon.com.br/dp/${isbn}`;
  const affiliateUrl = associateTag
    ? `${url}?tag=${associateTag}`
    : url;

  return {
    platform: "Amazon Brasil",
    platformSlug: "amazon",
    title: "",
    price: 0,
    url,
    affiliateUrl,
    currency: "BRL",
    inStock: true,
    isbn,
  };
}

export interface AmazonSearchResult {
  title: string;
  isbn?: string;
  price: number;
  url: string;
  affiliateUrl: string;
}

export async function searchAmazon(query: string, associateTag?: string): Promise<AmazonSearchResult[]> {
  return [];
}
