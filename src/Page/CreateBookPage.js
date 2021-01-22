import React, { Component } from "react";
import BookService from "../Services/BookService";
export default class CreateBook extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.newBook = this.newBook.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      price: 0,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  saveBook() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
    };

    BookService.create(data)
      .then(() => {
        this.props.history.goBack();
      })
      .catch((error) => {
        console.error(error);
      });
    // TODO: Call API to Create a new book
  }

  newBook() {
    this.setState({
      id: null,
      title: "",
      description: "",
      price: 0,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBook}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" required value={this.state.title} onChange={this.onChangeTitle} name="title" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input type="text" className="form-control" id="description" required value={this.state.description} onChange={this.onChangeDescription} name="description" />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="text" className="form-control" id="price" required value={this.state.price} onChange={this.onChangePrice} name="price" />
            </div>

            <button onClick={this.saveBook} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
