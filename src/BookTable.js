import React from "react";

import BookRow from "./BookRow";
import { observer } from "mobx-react";
import authorStore from "./stores/authorStore";

function BookTable(props) {
  const bookStore = props.store;
  const bookColor = props.bookColor;
  const author = props.author;
  let bookRows = bookStore.filteredBooks.map(book => (
    <BookRow key={book.id} book={book} />
  ));
  if (bookColor) {
    bookRows = bookStore
      .filterBooksByColor(bookColor)
      .map(book => <BookRow key={book.id} book={book} />);
  }
  if (author) {
    bookRows = bookStore
      .getBooksByAuthorId(author.id)
      .map(book => <BookRow key={book.id} book={book} />);
    bookStore.author = null;
  }

  return (
    <table className="mt-3 table">
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Authors</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>{bookRows}</tbody>
    </table>
  );
}

export default observer(BookTable);
