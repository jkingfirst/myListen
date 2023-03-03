import axios from '@u/axios';
import {RequestConfig} from '@u/http';
const apiUrl = {
  carouselsList: 'mock/11/bear/carousel',
};
export const getCarouselsList = (data: unknown, options: RequestConfig) => {
  return axios.get(apiUrl.carouselsList, data, options);
};
