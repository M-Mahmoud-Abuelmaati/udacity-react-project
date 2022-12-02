import { FC } from 'react';
import { Link } from 'react-router-dom';
import Books from '../components/BookShelf/Books';
import Navbar from '../components/Navbar';
import { bookType } from '../Types';
import { AiOutlineFolderAdd } from 'react-icons/ai';

const BookShelf: FC<{ books: bookType[]; onHandleEditBook: Function }> = ({
  books,
  onHandleEditBook,
}) => {
  return (
    <div className="bg-gray-100 h-max font-sans">
      <Navbar />
      <Books
        books={books}
        title={'Currently Reading'}
        onHandleEditBook={onHandleEditBook}
      />
      <hr />
      <Books
        books={books}
        title={'Want To Read'}
        onHandleEditBook={onHandleEditBook}
      />
      <hr />
      <Books books={books} title={'Read'} onHandleEditBook={onHandleEditBook} />
      <Link to={'/search'}>
        <AiOutlineFolderAdd className="rounded-full text-black w-10 h-10 ring ring-blue-500 fixed bottom-10 right-10 p-2 hover:bg-black/20 transition-colors" />
      </Link>
    </div>
  );
};

export default BookShelf;
