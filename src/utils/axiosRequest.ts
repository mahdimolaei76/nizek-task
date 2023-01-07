import axios from "axios";

export const HttpService = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    Authorization:
      window.localStorage.getItem("access_token") !== undefined
        ? `Bearer ${localStorage.getItem("access_token")}`
        : "Bearer null",
    "Cache-Control": "no-cache",
    "Cross-Domain": "true",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

HttpService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HttpService.interceptors.response.use(
  (response) => {
    console.log(response);

    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default HttpService;
