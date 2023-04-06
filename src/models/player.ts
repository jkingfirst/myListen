import {Model, Effect, EffectWithType, EffectsCommandMap} from 'dva-core-ts';
// import {call, put, race, take} from 'redux-saga/effects';
import {Reducer} from 'redux';
import {InitState} from '@t/player';
import {ResponseGenerator} from '@t/home';
import {getPlayerDetail} from '@api/album';
import {
  init,
  play as playSound,
  pause as soundPause,
  stop as stopSound,
  getSoundCurrentTime,
  getDuration,
} from '@conf/sound';
import {RootState} from '@m/index';
import {IProgram} from '@t/album';
interface PlayerMode extends Model {
  namespace: 'player';
  state: InitState;
  reducers: {
    setState: Reducer<InitState>;
  };
  effects: {
    getPlayerDetail: Effect;
    play: Effect;
    pause: Effect;
    watchCurrentTime: EffectWithType;
    previous: Effect;
    next: Effect;
  };
}
const initState: InitState = {
  soundUrl: '',
  id: '',
  playStatus: '',
  currentTime: 0,
  duration: 0,
  thumbnailUrl: '',
};
const delay = (timeout: number) =>
  new Promise<void>(resolve => setTimeout(resolve, timeout));
function* getCurrentTime(payload: EffectsCommandMap) {
  const {call, put} = payload;
  while (true) {
    yield call(delay, 1000);
    const currentTime: ResponseGenerator = yield call(getSoundCurrentTime);
    yield put({
      type: 'setState',
      payload: {
        currentTime,
      },
    });
  }
}
const playerModel: PlayerMode = {
  namespace: 'player',
  state: initState,
  reducers: {
    setState(state = initState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *getPlayerDetail({payload}, effects) {
      const {put, call} = effects;
      yield call(stopSound);

      const {data}: ResponseGenerator = yield call(getPlayerDetail, {
        id: payload.id,
      });
      yield call(init, data.soundUrl);
      yield put({
        type: 'setState',
        payload: {
          id: data.id,
          soundUrl: data.soundUrl,
          duration: getDuration(),
        },
      });
      yield put({
        type: 'play',
      });
    },
    *play(_, {call, put}) {
      yield put({
        type: 'setState',
        payload: {
          playStatus: 'playing',
        },
      });
      yield call(playSound);
      yield put({
        type: 'setState',
        payload: {
          playStatus: 'pause',
        },
      });
    },
    *pause(_, {call, put}) {
      yield call(soundPause);
      yield put({
        type: 'setState',
        payload: {
          playStatus: 'pause',
        },
      });
    },
    // effectWithType dva 加载的时候就去执行生成器函数
    watchCurrentTime: [
      function* (effects) {
        const {take, call, race} = effects;
        while (true) {
          yield take('play');
          yield race([call(getCurrentTime, effects), take('pause')]);
        }
      },
      {type: 'watcher'},
    ],
    *previous(_, {call, put, select}) {
      yield call(stopSound);
      const {list} = yield select(({album}: RootState) => album);
      const {id}: InitState = yield select(({player}: RootState) => player);
      //获取当前索引
      const currentIndex = list.findIndex((item: IProgram) => item.id === id);
      const previousIndex = currentIndex - 1;
      const previousId = list[previousIndex]?.id || '';
      yield put({
        type: 'setState',
        payload: {
          duration: 0,
        },
      });
      yield put({
        type: 'getPlayerDetail',
        payload: {
          id: previousId,
        },
      });
    },
    *next(_, {call, put, select}) {
      yield call(stopSound);
      const {list} = yield select(({album}: RootState) => album);
      const {id}: InitState = yield select(({player}: RootState) => player);
      //获取当前索引
      const currentIndex = list.findIndex((item: IProgram) => item.id === id);
      const nextIndex = currentIndex + 1;
      const nextId = list[nextIndex]?.id || '';
      yield put({
        type: 'setState',
        payload: {
          duration: 0,
        },
      });
      yield put({
        type: 'getPlayerDetail',
        payload: {
          id: nextId,
        },
      });
    },
  },
};
export default playerModel;
