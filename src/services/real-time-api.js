import axios from "axios";

const realTimeAPI = axios.create({
  baseURL: "https://api.leparse.tech/real-time",
});

export default realTimeAPI;
