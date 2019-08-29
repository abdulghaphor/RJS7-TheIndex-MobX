import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  books = [];
  loading = true;
  query = "";
  author = null;

  fetchBooks = async () => {
    try {
      const res = await instance.get("/api/books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };
  changeBookStatus = async () => {
    try {
      const res = await instance.get("/api/books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };
  getBooksByAuthorId = authorId => {
    let temp = [];
    this.books.forEach(book => {
      book.authors.forEach(author => {
        if (author.id === authorId) {
          temp.push(book);
        }
      });
    });
    return temp;
  };

  get filteredBooks() {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.query.toLowerCase())
    );
  }
  getBookById = id => this.books.find(book => +book.id === +id);

  filterBooksByColor = bookColor =>
    this.books.filter(book => book.color === bookColor);
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  author: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
