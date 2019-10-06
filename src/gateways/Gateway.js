import { BASE_URL } from "./constants";

export default function Gateway(path) {
  const url = `${BASE_URL}${path}`;

  function toJson(response) {
    return response.json();
  }

  function get() {
    return fetch(url).then(toJson);
  }

  function getById(id) {
    return fetch(`${url}/${id}`).then(toJson);
  }

  return {
    get,
    getById
  };
}
