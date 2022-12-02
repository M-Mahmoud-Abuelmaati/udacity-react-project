import { FC } from 'react';
import { bookType } from '../../Types';
import Book from './Book';

const Books: FC<{
  books: bookType[];
  onHandleEditBook: Function;
  title: string;
}> = ({ books, title, onHandleEditBook }) => {
  return (
    <div className="p-5 h-max max-h-max">
      {title !== 'None' && <h1 className="font-bold text-2xl pb-5">{title}</h1>}
      <div className="flex justify-center gap-10 h-max">
        {books
          .filter((fb) => {
            if (title === 'None') {
              return fb;
            } else {
              return (
                fb.shelf ===
                title[0].toLowerCase() + title.replaceAll(' ', '').slice(1)
              );
            }
          })
          .map((book) => {
            return (
              <Book
                key={book.id}
                book={book}
                onHandleEditBook={onHandleEditBook}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Books;
