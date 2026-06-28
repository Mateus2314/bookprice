import type { SearchResult } from "../types";

interface Props {
  book: SearchResult;
  onClick?: () => void;
}

export default function BookCard({ book, onClick }: Props) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-6 flex gap-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {book.imageUrl && (
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-24 h-36 object-cover rounded-lg flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {book.title}
        </h2>
        <p className="text-gray-500 mt-1">{book.author}</p>
        {book.publisher && (
          <p className="text-gray-400 text-sm">{book.publisher}</p>
        )}
        {book.bestPrice && (
          <p className="mt-2 text-sm text-gray-500">
            Menor preço:{" "}
            <span className="font-bold text-green-600">
              R$ {parseFloat(book.bestPrice.price).toFixed(2)}
            </span>{" "}
            em {book.bestPrice.platform}
          </p>
        )}
      </div>
    </div>
  );
}
