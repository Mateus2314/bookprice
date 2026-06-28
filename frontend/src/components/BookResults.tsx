import type { SearchResult } from "../types";
import BookCard from "./BookCard";

interface Props {
  results: SearchResult[];
  onSelect?: (book: SearchResult) => void;
}

export default function BookResults({ results, onSelect }: Props) {
  if (!results.length) return null;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">{results.length} livro(s) encontrado(s)</p>
      {results.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={onSelect ? () => onSelect(book) : undefined}
        />
      ))}
    </div>
  );
}
