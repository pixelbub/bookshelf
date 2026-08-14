import { useState } from "react";
import Home from "./pages/Home";
import { books } from "./data/books";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();

    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.fandom.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <nav>
        <h2>Daena's Archive</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search your library..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <button>+ Upload Book</button>
        <button>👤</button>
      </nav>

      <Home
        books={books}
        filteredBooks={filteredBooks}
        searchQuery={searchQuery}
      />
    </>
  );
}

export default App;