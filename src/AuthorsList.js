import React from "react";
import { observer } from "mobx-react";

// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
// Store
import authorStore from "./stores/authorStore";
import bookStore from "./stores/bookStore";
function AuthorsList(props) {
  const authorId = props.match.params.authorID;
  if (authorId) {
    const author = authorStore.getAuthorById(authorId);
    const authorName = `${author.first_name} ${author.last_name}`;
    return (
      <div className="author">
        <div>
          <h3>{authorName}</h3>
          <img
            src={author.imageUrl}
            className="img-thumbnail img-fluid"
            alt={authorName}
          />
        </div>
        <BookTable author={author} store={bookStore} />
      </div>
    );
  } else {
    const authorCards = authorStore.filteredAuthors.map(author => (
      <AuthorCard key={author.first_name + author.last_name} author={author} />
    ));
    return (
      <div>
        <h3>Authors</h3>
        <SearchBar store={authorStore} />
        <div className="row">{authorCards}</div>
      </div>
    );
  }
}
export default observer(AuthorsList);
