import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {getCarouselsList} from '@api/home';
import {Carousel, ResponseGenerator} from '@t/home';

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
    *fetchCarousel(_, {call, put}) {
      let {data}: ResponseGenerator = yield call(getCarouselsList);
      yield put({
        type: 'setState',
        payload: {
          carousels: data,
        },
      });
    },
  },
};
export default home;
