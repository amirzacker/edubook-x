import axios from "axios";
import { refreshToken } from "../redux/apiCalls";
import { store } from "../redux/store";

const BASE_URL = "https://localhost:8000/api/";

export const publicRequest = axios.create({ baseURL: BASE_URL });

export const userRequest = axios.create({ baseURL: BASE_URL });

userRequest.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = user && JSON.parse(user).currentUser;
    const token = currentUser?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

userRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken(store.dispatch);
      const newUser = JSON.parse(localStorage.getItem("persist:root"))?.user;
      const newCurrentUser = newUser && JSON.parse(newUser).currentUser;
      const newToken = newCurrentUser?.token;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
