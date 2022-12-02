import React, { FC, useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { search } from '../../API/BookAPI';
import { bookType } from '../../Types';
import Books from './Books';
import { useDebounce } from 'use-debounce';

const Search: FC<{ books: bookType[]; onHandleEditBook: Function }> = ({
  books,
  onHandleEditBook,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<bookType[]>([]);
  const [text] = useDebounce<string>(searchQuery, 200);

  const updateFilteredBooksOnSelect = (book: bookType, shelf: string) => {
    const newBooks = filteredBooks.map((b) => {
      if (b.id === book.id) {
        return {
          ...book,
          shelf,
        };
      }
      return b;
    });
    setFilteredBooks(newBooks);
  };

  useEffect(() => {
    if (text) {
      const searchFilter = async () => {
        const response = await search(text, 1);
        if (!response.error) setFilteredBooks(response);
        else setFilteredBooks([]);
      };
      searchFilter();
    } else {
      setFilteredBooks([]);
    }
  }, [text]);

  return (
    <div>
      <div className="border-b-2 flex items-center gap-3 shadow h-12">
        <Link to={'/'} className="pl-3">
          <AiOutlineArrowLeft />
        </Link>
        <input
          type="search"
          placeholder="Search..."
          className="indent-2 py-2 h-full w-full outline-none border-l-2 text-black font-bold text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {searchQuery && filteredBooks.length < 1 && (
        <h1 className="flex justify-center items-center font-bold mt-10">
          No Search Found.
        </h1>
      )}
      <Books
        books={filteredBooks}
        title="None"
        onHandleEditBook={onHandleEditBook}
        updateFilteredBooksOnSelect={updateFilteredBooksOnSelect}
      />
    </div>
  );
};

export default Search;
