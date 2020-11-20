import axios from "axios";

const api = axios.create({
    baseURL: "https://projects.upanastudio.com/allirita-api",
});

export default api;