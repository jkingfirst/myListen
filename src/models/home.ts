import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {getCarouselsList, getChannelList, getGuessList} from '@api/home';
import {Carousel, Guess, IChannel, ResponseGenerator} from '@t/home';
interface HomeState {
  carousels: Carousel[];
  guesses: Guess[];
  channels: IChannel[];
}
interface homeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers?: {
    // 同步动作，
    setState: Reducer<homeModel['state']>;
  };
  effects?: {
    fetchCarousel: Effect;
    fetchGuess: Effect;
    fetchChannel: Effect;
  };
}
const initialState = {
  carousels: [],
  guesses: [],
  channels: [],
};
const home: homeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    setState(state: HomeState = initialState, {payload}) {
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
    *fetchChannel(_, {put, call}) {
      let {data}: ResponseGenerator = yield call(getChannelList);
      yield put({
        type: 'setState',
        payload: {
          channels: data.results,
        },
      });
    },
  },
};
export default home;
