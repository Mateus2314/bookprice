import type { SearchResult } from "../types";

interface Props {
  results: SearchResult[];
}

export default function BookResults({ results }: Props) {
  if (!results.length) return null;

  return (
    <div className="space-y-6">
      {results.map((book) => (
        <div key={book.id} className="bg-white rounded-xl border border-gray-200 p-6 flex gap-6">
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

            <div className="mt-4 grid gap-3">
              {book.prices.map((price, i) => (
                <a
                  key={i}
                  href={price.affiliateUrl || price.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <span className="font-medium text-gray-700">
                    {price.platformName}
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    R$ {parseFloat(price.price).toFixed(2)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
