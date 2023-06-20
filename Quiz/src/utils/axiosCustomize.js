import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NProgress from "nprogress";
import { store } from "../redux/store.js";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 30,
});

const instance = axios.create({
  //     baseURL: "http://localhost:8081/",
  baseURL: "https://a917-103-11-199-107.ap.ngrok.io/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    // Do something before request is sent
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers.common = { Authorization: `Bearer ${access_token} ` };

    return config;
  },
  function (error) {
    NProgress.done();
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
