import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://appointment-manager-node.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
