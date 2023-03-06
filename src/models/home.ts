import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {getCarouselsList} from '@api/home';
import axios from 'axios';
interface Carousel {
  id: number;
  image: string;
  colors: [string, string];
}
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
interface homeModel extends Model {
  namespace: 'home';
  state: {
    carousels: Carousel[];
  };
  reducers?: {
    // 同步动作，
    setState: Reducer<homeModel['state']>;
  };
  effects?: {
    fetchCarousel: Effect;
  };
}
const home: homeModel = {
  namespace: 'home',
  state: {
    carousels: [],
  },
  reducers: {
    setState(state = {carousels: []}, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarousel(_, {call}) {
      let data: ResponseGenerator = yield call(getCarouselsList);
      console.log(data, '&&&&&&');
    },
  },
};
export default home;
