import axios from '@u/axios';
import {RequestConfig, DataType} from '@u/http';
const apiUrl = {
  albumDetail: 'mock/11/bear/album/list',
};
export const getAlbumDetail = (data?: DataType, options?: RequestConfig) => {
  return axios.get(apiUrl.albumDetail, data, options);
};
