import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {getCarouselsList, getGuessList} from '@api/home';
import {Carousel, Guess, ResponseGenerator} from '@t/home';

interface homeModel extends Model {
  namespace: 'home';
  state: {
    carousels: Carousel[];
    guesses: Guess[];
  };
  reducers?: {
    // 同步动作，
    setState: Reducer<homeModel['state']>;
  };
  effects?: {
    fetchCarousel: Effect;
    fetchGuess: Effect;
  };
}
const home: homeModel = {
  namespace: 'home',
  state: {
    carousels: [],
    guesses: [],
  },
  reducers: {
    setState(state = {carousels: [], guesses: []}, {payload}) {
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
    *fetchGuess(_, {call, put}) {
      let {data}: ResponseGenerator = yield call(getGuessList);
      yield put({
        type: 'setState',
        payload: {
          guesses: data,
        },
      });
    },
  },
};
export default home;
