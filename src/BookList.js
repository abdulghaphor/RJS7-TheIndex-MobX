import React from "react";
import { observer } from "mobx-react";

// Components
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import bookStore from "./stores/bookStore";

function BookList(props) {
  return (
    <div>
      <h3>Books</h3>
      <SearchBar store={bookStore} />
      <BookTable bookColor={props.match.params.bookColor} store={bookStore} />
    </div>
  );
}

export default observer(BookList);
