import React, { FC, useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { bookType } from '../../Types';
import Books from './Books';

const Search: FC<{ books: bookType[]; onHandleEditBook: Function }> = ({
  books,
  onHandleEditBook,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<bookType[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const searchFilter = (book: bookType) =>
        [book.title, book.description, book.publisher, book.authors]
          .join('')
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) !== -1;

      const filteredBooks = books.filter(searchFilter);
      setFilteredBooks(filteredBooks);
    } else {
      setFilteredBooks(books);
    }
  }, [searchQuery, books]);

  useEffect(() => {
    if (books) {
      setFilteredBooks(books);
    }
  }, [books]);

  return (
    <div>
      <div className="border-b-2 flex items-center gap-3 shadow h-12">
        <Link to={'/'} className="pl-3">
          <AiOutlineArrowLeft />
        </Link>
        <input
          type="search"
          placeholder="Search by title / description / publisher / authors"
          className="indent-2 py-2 h-full w-full outline-none border-l-2 text-black font-bold text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Books
        books={filteredBooks}
        title="None"
        onHandleEditBook={onHandleEditBook}
      />
    </div>
  );
};

export default Search;
