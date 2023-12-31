import axios from "axios";

const api = axios.create({
  baseURL: "https://api.leparse.tech/admin",
  // baseURL: "http://localhost:3003",
});

api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem("$leparse-admin-token");

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response);
    if (error.response.status === 401 || error.response.status === 403) {
      window.location = "/login?expiredToken=true";
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
