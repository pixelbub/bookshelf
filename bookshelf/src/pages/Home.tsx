import BookCard from "../components/BookCard";
import StatsCard from "../components/StatsCard";
import type { Book } from "../types/book";
import { useState } from "react";

type HomeProps = {
  books: Book[];
  filteredBooks: Book[];
  searchQuery: string;
  onDelete: (id: number) => void;
  onEdit: (book: Book) => void;
};

export default function Home({ books, filteredBooks, searchQuery, onDelete, onEdit}: HomeProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const currentlyReading = books.slice(0, 3);

  return (
    <main>
      <section className="welcome">
        <p>Good evening 👋</p>
        <h1>Welcome to your library.</h1>
        <span>Your little corner of the internet.</span>
      </section>

     


      <section>
        <div className="section-header">
          <h2>My Library</h2>
        </div>

        <div className="filter-bar">
          <button>All</button>
          <button>PDF</button>
          <button>EPUB</button>
          <button>Favorites</button>

          <select>
            <option>Recently Added</option>
            <option>Title</option>
            <option>Author</option>
          </select>
        </div>

        {searchQuery && (
          <p>
            {filteredBooks.length} result
            {filteredBooks.length !== 1 ? "s" : ""} for "{searchQuery}"
          </p>
        )}

        {searchQuery && filteredBooks.length === 0 && (
          <div className="no-results">
            <h3>No books found</h3>
            <p>Try searching for another title.</p>
          </div>
        )}

        <div className="bookshelf">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId}/>
            ))}
        </div>

        
      <section>
        <div className="section-header">
          <h2>Currently Reading</h2>
          <button>View all →</button>
        </div>

        <div className="bookshelf">
          {currentlyReading.map((book) => (
            <BookCard key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId}/>
          ))}
        </div>
      </section>
      </section>

       <section className="stats-grid">
        <StatsCard label="Total Books" value={87} icon="📚" />
        <StatsCard label="Currently Reading" value={3} icon="📖" />
        <StatsCard label="Favorites" value={12} icon="❤️" />
        <StatsCard label="Fandoms" value={8} icon="🏷️" />
      </section>
    </main>
  );
}