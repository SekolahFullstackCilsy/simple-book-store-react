import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookService from "../Services/BookService";

export default class BooksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      Books: [],
      currentBook: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveBooks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveBooks() {
    BookService.retrieveAll()
      .then((response) => {
        const data = response.data;
        this.setState({
          Books: data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    // TODO: Call API to Retrieve all books
  }

  refreshList() {
    this.retrieveBooks();
    this.setState({
      currentBook: null,
      currentIndex: -1,
    });
  }

  setActiveBook(Book, index) {
    this.setState({
      currentBook: Book,
      currentIndex: index,
    });
  }

  searchTitle() {
    this.setState({
      currentBook: null,
      currentIndex: -1,
    });

    BookService.searchByTitle(this.state.searchTitle)
      .then((response) => {
        const data = response.data;
        this.setState({
          Books: data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    // TODO: Call API to search books by title
  }

  render() {
    const { searchTitle, Books, currentBook, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search by title" value={searchTitle} onChange={this.onChangeSearchTitle} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.searchTitle}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Books List</h4>

          <ul className="list-group">
            {Books &&
              Books.map((Book, index) => (
                <li className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.setActiveBook(Book, index)} key={index}>
                  {Book.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentBook ? (
            <div>
              <h4>Book</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentBook.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentBook.description}
              </div>
              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentBook.price}
              </div>

              <Link to={"/books/" + currentBook.id} className="badge badge-warning">
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Book...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
