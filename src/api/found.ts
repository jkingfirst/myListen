import axios from '@u/axios';
import {RequestConfig, DataType} from '@u/http';
const apiUrl = {
  foundList: 'mock/11/bear/found/list',
};
export const getFoundList = (data?: DataType, options?: RequestConfig) => {
  return axios.get(apiUrl.foundList, data, options);
};
