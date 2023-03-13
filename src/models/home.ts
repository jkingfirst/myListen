import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {getCarouselsList, getChannelList, getGuessList} from '@api/home';
import {
  Carousel,
  Guess,
  IChannel,
  IPagination,
  ResponseGenerator,
} from '@t/home';
import {cbMidWare} from '@u/tools';
import {RootState} from '@m/index';

interface HomeState {
  carousels: Carousel[];
  guesses: Guess[];
  channels: IChannel[];
  pagination: IPagination;
  activeCarouselsIndex: number; // 首页轮播索引
  gradientVisible: boolean; // 首页渐变组件是否显示
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
    fetchHomeData: Effect;
  };
}
const initialState = {
  carousels: [],
  guesses: [],
  channels: [],
  pagination: {
    current: 1,
    total: 0,
    hasMore: true,
  },
  activeCarouselsIndex: 0,
  gradientVisible: true,
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
    *fetchChannel(_, {put, call, select}) {
      let {
        channels,
        pagination,
      }: {channels: IChannel[]; pagination: IPagination} = yield select(
        (state: RootState) => state.home,
      );
      let page = 1;
      page = pagination.current + 1;
      let {data}: ResponseGenerator = yield call(getChannelList, {
        params: {page},
      });
      let newChannels = data.results;
      newChannels = channels.concat(newChannels);
      yield put({
        type: 'setState',
        payload: {
          channels: newChannels,
          pagination: {
            current: pagination.current,
            total: pagination.total,
            hasMore: newChannels.length <= data.pagination.total,
          },
        },
      });
    },
    *fetchHomeData({callback}, {call, put}) {
      let {data: channelData}: ResponseGenerator = yield call(getChannelList);
      let {data: guesses}: ResponseGenerator = yield call(getGuessList);
      let {data: carousels}: ResponseGenerator = yield call(getCarouselsList);
      yield put({
        type: 'setState',
        payload: {
          channels: channelData.results,
        },
      });
      yield put({
        type: 'setState',
        payload: {
          guesses,
        },
      });
      yield put({
        type: 'setState',
        payload: {
          carousels,
        },
      });
      cbMidWare(callback);
    },
  },
};
export default home;
