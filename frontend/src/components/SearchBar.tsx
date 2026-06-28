import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
  placeholder?: string;
}

export default function SearchBar({ onSearch, loading, placeholder = "Buscar livros..." }: Props) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-body pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-title text-sm placeholder-body focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
      />
    </form>
  );
}
