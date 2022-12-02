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
      console.log(books)
    };
    fetchBooks();
  }, []);

  const onHandleEditBook = async (id: string, shelf: string) => {
    const newBooks = books.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          shelf,
        };
      }
      return book;
    });
    await update(id, shelf);
    setBooks(newBooks);
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
