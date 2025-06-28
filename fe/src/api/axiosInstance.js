import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  // You can add other default settings here like headers
  // headers: {
  //   'Authorization': 'Bearer YOUR_TOKEN'
  // }
});

export default axiosInstance;