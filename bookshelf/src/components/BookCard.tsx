//import { Heart, MoreVertical } from "lucide-react";
import type { Book } from "../types/book";
import { useState } from "react";

type BookCardProps = {
  book: Book;
  onDelete: (id: number) => void;
  onEdit: (book: Book) => void;
  openMenuId: number | null;
  setOpenMenuId: (id: number | null) => void;
};



export default function BookCard({ book, onDelete, onEdit, openMenuId, setOpenMenuId, }: BookCardProps) {

  const showMenu = openMenuId === book.id;

  const coverSource = book.cover
  ? book.cover
  : book.coverFile
    ? URL.createObjectURL(book.coverFile)
    : "/default-cover.png";

  return (
    <div className="book-card">
      <div className="book-cover-container">
        <img
          src={coverSource}
          alt={`Cover of ${book.title}`}
          className="book-cover"
        />

        <button className="favorite-button">
            {book.favorite ? "♥" : "♡"}
        </button>

        <button 
          className="more-button" 
          onClick={() => 
            setOpenMenuId(showMenu ? null : book.id)
          } 
        >
         ⋮
        </button>

        {showMenu && (
          <div className="book-menu">
            <button type="button" onClick={() => onEdit(book)}>Edit</button>
            <button type="button" onClick={() => onDelete(book.id)}> Delete </button> 
          </div>
        )}

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