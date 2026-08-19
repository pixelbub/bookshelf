import { openDB } from 'idb';
import type { Book } from "../types/book";

//database details

const DB_NAME = "bookshelf"
const DB_VERSION = 1;
const STORE_NAME ="books";

const dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db){
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, {
                keyPath: "id",

            });
        }
    },
});

//add book to database
export async function addBook(book: Book) {
  const db = await dbPromise;

  await db.put(STORE_NAME, book);
}

//retrieve books from database 
export async function getBooks(): Promise<Book[]> {
  const db = await dbPromise;

  return db.getAll(STORE_NAME);
}

//delete book from db

export async function deleteBook(id: number) {
    const db = await dbPromise;

    await db.delete(STORE_NAME, id);
    
}

// edit book details

/*export async function editBook(book: Book) {
    const db = await dbPromise;
    
    await db.put(STORE_NAME, book);

}*/

//update the book details
export async function updateBook(book: Book) {
  const db = await dbPromise;

  await db.put(STORE_NAME, book);
}