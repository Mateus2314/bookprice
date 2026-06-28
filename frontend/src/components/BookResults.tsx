import type { SearchResult } from "../types";
import ResultCard from "./ResultCard";

interface Props {
  results: SearchResult[];
  onSelect?: (book: SearchResult) => void;
}

export default function BookResults({ results, onSelect }: Props) {
  if (!results.length) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs text-body px-4">{results.length} livro(s) encontrado(s)</p>
      <div className="px-4 space-y-3">
        {results.map((book) => (
          <ResultCard
            key={book.id}
            book={book}
            onClick={onSelect ? () => onSelect(book) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
