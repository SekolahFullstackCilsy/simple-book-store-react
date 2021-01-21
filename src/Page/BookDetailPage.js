import React, { Component } from "react";
import BookDataService from "../Services/BookService";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.getBook = this.getBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);

    this.state = {
      currentBook: {
        id: null,
        title: "",
        description: "",
        price: 0,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getBook(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentBook: {
        ...prevState.currentBook,
        description: description,
      },
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState((prevState) => ({
      currentBook: {
        ...prevState.currentBook,
        price,
      },
    }));
  }

  getBook(id) {
    BookDataService.get(id)
      .then((response) => {
        this.setState({
          currentBook: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateBook() {
    BookDataService.update(this.state.currentBook.id, this.state.currentBook)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The Book was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteBook() {
    BookDataService.delete(this.state.currentBook.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.goBack();
      })
      .catch((e) => {
        this.setState({
          message: "Error when deleting a book",
        });
        console.log(e);
      });
  }

  render() {
    const { currentBook } = this.state;

    return (
      <div>
        {currentBook ? (
          <div className="edit-form">
            <h4>Book</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" value={currentBook.title} onChange={this.onChangeTitle} />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" value={currentBook.description} onChange={this.onChangeDescription} />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="text" className="form-control" id="price" value={currentBook.price} onChange={this.onChangePrice} />
              </div>
            </form>

            <button className="badge badge-danger mr-2" onClick={this.deleteBook}>
              Delete
            </button>

            <button type="submit" className="badge badge-success" onClick={this.updateBook}>
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Book...</p>
          </div>
        )}
      </div>
    );
  }
}
