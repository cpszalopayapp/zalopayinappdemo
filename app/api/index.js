import axios from "axios";

const CREATE_ORDER_PATH = "http://zp.789.vn/CreateOrder.cshtml";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

axios.interceptors.response.use(
  response => {
    const { data } = response;
    const { code } = data;
    if (code === 1) {
      return data;
    }
    return Promise.reject(data);
  },
  error => {
    return Promise.reject(error);
  }
);

const createOrder = params => {
  const fromData = new FormData();
  fromData.append("amount", 10000);

  return axios.post(CREATE_ORDER_PATH, fromData);
};

export default {
  createOrder
};
