import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function Reader() {
  const [numPages, setNumPages] = useState<number>(0);

  const [bookSize, setBookSize] = useState({
    width: 600,
    height: 800,
  });

  useEffect(() => {
    const updateBookSize = () => {
      const maxWidth = window.innerWidth * 0.42;
      const maxHeight = window.innerHeight * 0.78;

      const width = Math.min(maxWidth, 700);
      const height = Math.min(maxHeight, 900);

      setBookSize({
        width,
        height,
      });
    };

    updateBookSize();

    window.addEventListener("resize", updateBookSize);

    return () => {
      window.removeEventListener("resize", updateBookSize);
    };
  }, []);

  return (
    <main className="reader">
      <h1>My Book</h1>

      <Document
        file="/test.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <HTMLFlipBook
          width={bookSize.width}
          height={bookSize.height}
          size="fixed"
          showCover={true}
          mobileScrollSupport={true}
          drawShadow={true}
          flippingTime={900}
          usePortrait={false}
          className="book"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div className="page" key={`page_${index + 1}`}>
              <Page
                pageNumber={index + 1}
                width={bookSize.width}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </Document>

      <p>{numPages} pages</p>
    </main>
  );
}