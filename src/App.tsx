import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/BookShelf/Search';
import BookShelf from './pages/BookShelf';
import { useEffect, useState } from 'react';
import { getAll, update } from './API/BookAPI';
import { bookType } from './Types';

function App() {
  const [books, setBooks] = useState<bookType[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books: bookType[] = await getAll();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  const onHandleEditBook = async (book: bookType, shelf: string) => {
    const findBook = books.findIndex((b) => b.id === book.id);
    if (findBook === -1) {
      setBooks((ps) => {
        return [...ps, { ...book, shelf }];
      });
    } else {
      const newBooks = books.map((b) => {
        if (b.id === book.id) {
          return {
            ...book,
            shelf,
          };
        }
        return b;
      });
      setBooks(newBooks);
    }
    await update(book.id, shelf);
    console.log(books);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BookShelf books={books} onHandleEditBook={onHandleEditBook} />
          }
        />
        <Route
          path="/search"
          element={<Search books={books} onHandleEditBook={onHandleEditBook} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
