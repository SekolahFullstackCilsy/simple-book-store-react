import httpClient from "../Common/Http";

class BookService {
  retrieveAll() {
    return httpClient.get("/books/");
  }

  searchByTitle(title) {
    return httpClient.get(`/books?title=${title}`);
  }

  retrieveById(id) {
    return httpClient.get(`/books/${id}`);
  }

  create(data) {
    return httpClient.post("/books/", data);
  }

  update(id, data) {
    return httpClient.put(`/books/${id}`, data);
  }

  delete(id) {
    return httpClient.delete(`/books/${id}`);
  }
}

export default new BookService();
