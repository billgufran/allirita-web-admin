import axios from "axios";

const api = axios.create({
    baseURL: "https://allirita-api.upanastudio.com/api",
});

export default api;