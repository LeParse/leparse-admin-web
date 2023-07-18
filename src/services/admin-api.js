import axios from "axios";

const adminAPI = axios.create({
  baseURL: "https://api.leparse.tech/admin",
});

export default api;
