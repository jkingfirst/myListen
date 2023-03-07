import axios from '@u/axios';
import {RequestConfig, DataType} from '@u/http';
const apiUrl = {
  carouselsList: 'mock/11/bear/carousel',
  guessList: 'mock/11/bear/guess',
};
export const getCarouselsList = (data?: DataType, options?: RequestConfig) => {
  return axios.get(apiUrl.carouselsList, data, options);
};
export const getGuessList = (data?: DataType, options?: RequestConfig) => {
  return axios.get(apiUrl.guessList, data, options);
};
