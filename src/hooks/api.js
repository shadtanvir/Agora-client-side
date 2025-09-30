// api.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000", // update if needed
});

export default api;
