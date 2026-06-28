import type { SearchResult } from "../types";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: SearchResult[];
  onSelect?: (book: SearchResult) => void;
}

export default function SectionRow({ title, books, onSelect }: Props) {
  if (!books.length) return null;

  return (
    <section>
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-sm font-semibold text-title">{title}</h2>
        <button className="text-[11px] text-body hover:text-accent transition-colors">
          Ver tudo
        </button>
      </div>
      <div className="border-b border-border/50 mx-4" />
      <div className="flex gap-3 overflow-x-auto px-4 py-4 scroll-smooth" style={{ scrollbarWidth: "none" }}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} onClick={onSelect ? () => onSelect(book) : undefined} />
        ))}
      </div>
    </section>
  );
}
