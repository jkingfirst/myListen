import axios from '@u/axios';
import {RequestConfig, DataType} from '@u/http';
const apiUrl = {
  categoryList: 'mock/11/bear/category',
};
export const getCategoryList = (data?: DataType, options?: RequestConfig) => {
  return axios.get(apiUrl.categoryList, data, options);
};
