// api.js
import axios from "axios";

const api = axios.create({
    baseURL: "https://agora-shadtanvir-server.vercel.app",
});

export default api;
