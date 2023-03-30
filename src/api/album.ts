import axios from '@u/axios';
import {RequestConfig, DataType} from '@u/http';
const apiUrl = {
  albumDetail: 'mock/11/bear/album/list',
  playerDetail: 'mock/11/bear/show',
};
export const getAlbumDetail = (data?: DataType, options?: RequestConfig) => {
  return axios.get(apiUrl.albumDetail, data, options);
};
export const getPlayerDetail = (data?: DataType, options?: RequestConfig) => {
  return axios.get(apiUrl.playerDetail, data, options);
};
