import { apiGet, apiPost } from "./client";
import type { SearchResult } from "../types";

export async function searchBooks(query: string): Promise<{ results: SearchResult[] }> {
  return apiGet<{ results: SearchResult[] }>(`/api/search?q=${encodeURIComponent(query)}`);
}

export async function getFeaturedBooks(): Promise<{ results: SearchResult[] }> {
  return apiGet<{ results: SearchResult[] }>("/api/books/featured");
}

export async function getBooks(query?: string): Promise<SearchResult[]> {
  const qs = query ? `?q=${encodeURIComponent(query)}` : "";
  return apiGet<SearchResult[]>(`/api/books${qs}`);
}

export async function getBookByIsbn(isbn: string): Promise<SearchResult> {
  return apiGet<SearchResult>(`/api/books/${isbn}`);
}

export async function createBook(data: {
  isbn: string;
  title: string;
  author: string;
  publisher?: string;
  imageUrl?: string;
}): Promise<SearchResult> {
  return apiPost<SearchResult>("/api/books", data);
}
