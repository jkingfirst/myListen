import axios from '@u/axios';
import {RequestConfig, DataType} from '@u/http';
const apiUrl = {
  login: 'mock/11/bear/login',
  logout: 'mock/11/bear/logout',
};
export const login = (data?: DataType, options?: RequestConfig) => {
  return axios.post(apiUrl.login, data, options);
};
export const logout = (data?: DataType, options?: RequestConfig) => {
  return axios.get(apiUrl.logout, data, options);
};
