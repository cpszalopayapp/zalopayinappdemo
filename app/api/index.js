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
  const formData = new FormData();
  Object.keys(params).forEach(key => {
    formData.append(key, params[key]);
  });

  return axios.post(CREATE_ORDER_PATH, formData);
};

export default {
  createOrder
};
