//import { Heart, MoreVertical } from "lucide-react";
import type { Book } from "../types/book";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="book-card">
      <div className="book-cover-container">
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="book-cover"
        />

        <button className="favorite-button">
            {book.favorite ? "♥" : "♡"}
        </button>

        <button className="more-button">
         ⋮
        </button>
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <span>{book.fandom}</span>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${book.progress}%` }}
          />
        </div>

        <small>{book.progress}% read</small>
      </div>
    </div>
  );
}