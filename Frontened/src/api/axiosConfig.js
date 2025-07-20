// src/api/axiosConfig.js
import axios from "axios";

export default axios.create({
  baseURL:  "http://localhost:5000/api", // fallback included
});
