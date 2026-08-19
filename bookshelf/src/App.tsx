import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import { books } from "./data/books";
import type { Book } from "./types/book";
import UploadModal from "./components/UploadModal";
import { addBook, getBooks, deleteBook, updateBook } from "./db/database";

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [library, setLibrary] = useState<Book[]>(books);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const filteredBooks = library.filter((book) => {
    const query = searchQuery.toLowerCase();

    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.fandom.toLowerCase().includes(query)
    );
  });

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setShowUploadModal(true);

    //const fileName = file.name;
    //const extension = fileName
    //.split(".")
    //.pop()
    //?.toLowerCase();

    //if(extension !== "pdf" && extension !== "epub"){
    //  alert("please upload a pdf or epub file");
    //  return;
    //}

    //const title = fileName.replace(/\.(pdf|epub)$/i, "");

    /*const format = extension === "pdf" ? "PDF" : "EPUB";

    

    const newBook: Book = {
      id: Date.now(),
      title: title,
      author:"Unknown",
      fandom:"Unknown",
      cover: "",
      format: format,
      progress: 0,
      favorite: false,
      file: file,
    };

    //check if its aactually uploading
    console.log("new book:", newBook);
    */
  };

  const handleAddBook = async (newBook: Book) => {

    await addBook(newBook);

    setLibrary((currentLibrary) => [
      ...currentLibrary,
      newBook,
    ]);

    setSelectedFile(null);
    setShowUploadModal(false); 
  };

  const handleDeleteBook = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if(!confirmed) return;

    await deleteBook(id);

    setLibrary((currentLibrary) => 
      currentLibrary.filter((book) => book.id !== id)
    );
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setShowUploadModal(true);
  };

  const handleUpdateBook = async (updatedBook:Book) => {
    await updateBook(updatedBook);

    setLibrary((currentLibrary) =>
      currentLibrary.map((book) =>
        book.id == updatedBook.id
          ? updatedBook
          : book
      )
    );

    setEditingBook(null);
    setShowUploadModal(false);
  };

  useEffect(() => {
    async function loadBooks() {
      
      const savedBooks = await getBooks();
      
      if(savedBooks.length > 0){
        setLibrary([...books, ...savedBooks]);
      }
    
    }

    loadBooks();

  }, []); //idk if this should be here

  

  return (
    <>
      <nav>
        <h2>Daena's Archive</h2>

        <div className="search-container">
          <input
            className="searchbar"
            type="text"
            placeholder="Search your library..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

      <>
        <input 
          type="file" 
          accept=".pdf,.epub" 
          id="book-upload" 
          style={{display: "none"}} 
          onChange={handleFileUpload}
        />

        <label htmlFor="book-upload" className="upload-button">
          + Upload Book
        </label>

        
      
      </>

      <button>👤</button>

      </nav>

     
      {uploadedFile && (
        <div>
          <h3>Uploaded Book</h3>
            <p>{uploadedFile.name}</p>
            <p>{uploadedFile.type}</p>
        </div>
      )}

      <Home
        books={library}
        filteredBooks={filteredBooks}
        searchQuery={searchQuery}
        onDelete={handleDeleteBook}
        onEdit={handleEditBook}
      />

      {showUploadModal && (
        <UploadModal
          file={selectedFile ?? undefined}
          book={editingBook ?? undefined}
          onClose={() => {
            setSelectedFile(null);
            setShowUploadModal(false);
          }}
          onAddBook={handleAddBook}
          onUpdateBook={handleUpdateBook}
        />
      )}

    </>
  );
}

export default App;