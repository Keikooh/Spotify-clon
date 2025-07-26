import axios from "axios";

const API_BASE_URL = "https://accounts.spotify.com/api";

export const axiosAuthInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
