import { FC, useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { bookType } from '../../Types';

const Book: FC<{
  book: bookType;
  onHandleEditBook: Function;
  updateFilteredBooksOnSelect?: Function;
}> = ({ book, onHandleEditBook, updateFilteredBooksOnSelect }) => {
  const [bookStatus, setBookStatus] = useState<boolean>(false);

  const onHandleOpenEditBook = () => {
    setBookStatus(!bookStatus);
  };

  const replaceBookTitle = (title: string) => {
    if (title.length > 25) {
      let newTitle = '';
      for (let index = 0; index < 25; index++) {
        newTitle += title[index];
      }
      return newTitle + '...';
    } else {
      return title;
    }
  };
  return (
    <div
      key={book.id}
      className="flex flex-col justify-evenly items-center gap-2 relative"
    >
      <img
        src={book.imageLinks ? book.imageLinks.thumbnail : ''}
        alt="thumbnail"
        className="object-fill w-52 h-full rounded cursor-pointer hover:animate-pulse"
        onClick={() =>
          window.open(book.previewLink, '_blank', 'noopener,noreferrer')
        }
      />
      <div className="">
        <AiOutlineArrowDown
          className="absolute bottom-20 right-3 bg-blue-500 text-white rounded-full p-3 cursor-pointer hover:bg-blue-600 transition-colors ring-2 ring-black/50"
          size={40}
          onClick={() => onHandleOpenEditBook()}
        />
        {bookStatus && (
          <ol
            className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-lg text-white text-sm flex flex-col"
            onMouseLeave={() => onHandleOpenEditBook()}
            onClick={(e: any) => {
              if (updateFilteredBooksOnSelect) {
                updateFilteredBooksOnSelect(book, e.target.value);
              }
              onHandleEditBook(book, e.target.value);
            }}
          >
            <option disabled>Move to...</option>
            <option
              value="currentlyReading"
              className={`cursor-pointer hover:bg-slate-50/20 rounded ${
                book.shelf === 'currentlyReading' && 'bg-slate-50/20'
              }`}
            >
              Currently Reading
            </option>
            <option
              value="wantToRead"
              className={`cursor-pointer hover:bg-slate-50/20 rounded ${
                book.shelf === 'wantToRead' && 'bg-slate-50/20'
              }`}
            >
              Want To Read
            </option>
            <option
              value="read"
              className={`cursor-pointer hover:bg-slate-50/20 rounded ${
                book.shelf === 'read' && 'bg-slate-50/20'
              }`}
            >
              Read
            </option>
            <option
              value="none"
              className={`cursor-pointer hover:bg-slate-50/20 rounded ${
                book.shelf === 'none' && 'bg-slate-50/20'
              }`}
            >
              None
            </option>
          </ol>
        )}
      </div>
      <div className="p-1">
        <h1 className="text-sm font-bold">{replaceBookTitle(book.title)}</h1>
        <h2 className="text-sm font-thin">
          {book.authors && book.authors[0] ? book.authors[0] : book.authors}
        </h2>
      </div>
    </div>
  );
};

export default Book;
