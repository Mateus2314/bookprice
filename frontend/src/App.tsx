import { useState } from "react";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import type { SearchResult } from "./types";

type View = { page: "home" } | { page: "detail"; isbn: string };

export default function App() {
  const [view, setView] = useState<View>({ page: "home" });

  function handleSelectBook(book: SearchResult) {
    setView({ page: "detail", isbn: book.isbn });
  }

  switch (view.page) {
    case "home":
      return <HomePage onSelectBook={handleSelectBook} />;
    case "detail":
      return <BookDetailPage isbn={view.isbn} onBack={() => setView({ page: "home" })} />;
  }
}
