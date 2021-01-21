import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CreateBook from "./Page/CreateBookPage";
import BookDetail from "./Page/BookDetailPage";
import BooksList from "./Page/BookListPage";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/books"} className="navbar-brand">
              Sekolah Fullstack Bookstore
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/books"} className="nav-link">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/books/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/books" component={BooksList} />
              <Route exact path="/books/add" component={CreateBook} />
              <Route path="/books/:id" component={BookDetail} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
