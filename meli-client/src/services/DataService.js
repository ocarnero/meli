import http from "./http-common";

class DataService {
  getUsers() {
    return http.get(`users`).then((response) => response.data);
  }

  search(query) {
    return http
      .get(`items?query=${query}`)
      .then((response) => response.data);
  }

  getProductById(id) {
    return http
      .get(`items/${id}`)
      .then((response) => response.data);
  }
}

export default new DataService();
