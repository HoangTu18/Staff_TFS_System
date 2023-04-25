import axios from "axios";
import { API_URL } from "../utils/constant";

export class BaseService {
  get = (url, model) => {
    return axios({
      url: `${API_URL}/${url}`,
      method: "GET",
      data: model,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  post = (url, model) => {
    return axios({
      url: `${API_URL}/${url}`,
      method: "POST",
      data: model,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  put = (url, model) => {
    return axios({
      url: `${API_URL}/${url}`,
      method: "PUT",
      data: model,
      // headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  delete = (url, model) => {
    return axios({
      url: `${API_URL}/${url}`,
      method: "DELETE",
      data: model,
      // headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
}
