import axios from 'axios';
import { config } from "../config";

const { SERVER_URL } = config;

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosInstance;
