import { useState } from "react";
import type { Book } from "../types/book";

type UploadModalProps = {
  file: File;
  onClose: () => void;
  onAddBook: (book: Book) => void;
};

export default function UploadModal({
  file,
  onClose,
  onAddBook,
}: UploadModalProps) {
  const [title, setTitle] = useState(
    file.name.replace(/\.(pdf|epub)$/i, "")
  );

  const [author, setAuthor] = useState("");
  const [fandom, setFandom] = useState("");
  const [cover, setCover] = useState("");

  const handleCoverUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const image = event.target.files?.[0];

    if (!image) return;

    const imageURL = URL.createObjectURL(image);
    setCover(imageURL);
  };

  const handleSubmit = () => {
    const newBook: Book = {
      id: Date.now(),
      title,
      author,
      fandom,
      cover,
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

        <h2>Add Book</h2>

        <p>
          File: <strong>{file.name}</strong>
        </p>

        <div>
          <label>Cover</label>

          {cover && (
            <img
              src={cover}
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
            Add Book
          </button>
        </div>

      </div>
    </div>
  );
}