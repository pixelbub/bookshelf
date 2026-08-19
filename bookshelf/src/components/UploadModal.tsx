import { useEffect, useState } from "react";
import type { Book } from "../types/book";

type UploadModalProps = {
  file?: File;
  book?: Book;
  onClose: () => void;
  onAddBook: (book: Book) => void;
  onUpdateBook: (book: Book) => void;

};



export default function UploadModal({
  file,
  book,
  onClose,
  onAddBook,
  onUpdateBook,
}: UploadModalProps) {
  const [title, setTitle] = useState("");
  /*
    file?.name.replace(/\.(pdf|epub)$/i, "") ??
    ""
  */

  const [author, setAuthor] = useState(book?.author ?? "");
  const [fandom, setFandom] = useState(book?.fandom ?? "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState(book?.cover ?? "");

  useEffect(() => {
  if (book) {
    setTitle(book.title);
    setAuthor(book.author);
    setFandom(book.fandom);
    setCoverPreview(book.cover ?? "");
  } else if (file) {
    setTitle(
      file.name.replace(/\.(pdf|epub)$/i, "")
    );
    setAuthor("");
    setFandom("");
    setCoverPreview("");
  }
}, [book, file]);

  const handleCoverUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const image = event.target.files?.[0];

    if (!image) return;

    setCoverFile(image);

    const imageURL = URL.createObjectURL(image);
    setCoverPreview(imageURL);
  };

  const handleSubmit = () => {

    if (book) {
      const updatedBook: Book = {
        ...book,
        title,
        author,
        fandom,
        coverFile: coverFile ?? book.coverFile,
      };

      onUpdateBook(updatedBook);
      return;
    }

    if (!file) return;

    const newBook: Book = {
      id: Date.now(),
      title,
      author,
      fandom,
      coverFile: coverFile ?? undefined,
      format: file.name.toLowerCase().endsWith(".pdf")
        ? "PDF"
        : "EPUB",
      progress: 0,
      favorite: false,
      file,
    };

    onAddBook(newBook);
  };

  return (
    <div className="modal-overlay">
      <div className="upload-modal">

        <h2>{book ? "Edit Book" : "Add Book"}</h2>

        <p>
          File:{" "} 
          <strong>
            {book
              ? `${book.title}.${book.format.toLowerCase()}`
              : file?.name}
          </strong>
        </p>

        <div>
          <label>Cover</label>

          {coverPreview && (
            <img
              src={coverPreview}
              alt="Book cover preview"
              width="120"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
          />
        </div>

        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>

        <div>
          <label>Fandom</label>
          <input
            type="text"
            value={fandom}
            onChange={(event) => setFandom(event.target.value)}
          />
        </div>

        <div>
          <button onClick={onClose}>
            Cancel
          </button>

          <button onClick={handleSubmit}>
            {book ? "Save Changes" : "Add Book"}
          </button>
        </div>

      </div>
    </div>
  );
}