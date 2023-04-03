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
  };
}
const initState: InitState = {
  soundUrl: '',
  id: '',
  playStatus: '',
  currentTime: 0,
  duration: 0,
};
const delay = (timeout: number) =>
  new Promise<void>(resolve => setTimeout(resolve, timeout));
function* getCurrentTime(payload: EffectsCommandMap) {
  const {call, put} = payload;
  console.log(payload);
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
    // effectWithType dva 加载的时候就去执行生成器函数
    watchCurrentTime: [
      function* (effects) {
        const {take, call, race} = effects;
        while (true) {
          yield take('play');
          console.log('🚀');
          yield race([call(getCurrentTime, effects), take('pause')]);
        }
      },
      {type: 'watcher'},
    ],
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
    *play({payload}, {call, put}) {
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
    *pause({payload}, {call, put}) {
      console.log('暂停');
      yield call(soundPause);
      yield put({
        type: 'setState',
        payload: {
          playStatus: 'pause',
        },
      });
    },
  },
};
export default playerModel;
