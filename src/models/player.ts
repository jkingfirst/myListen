import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import {IPlayerItem} from '@t/player';
import {ResponseGenerator} from '@t/home';
import {getPlayerDetail} from '@api/album';
interface PlayerMode extends Model {
  namespace: 'player';
  state: IPlayerItem;
  reducers: {
    setState: Reducer<IPlayerItem>;
  };
  effects: {
    getPlayerDetail: Effect;
  };
}
const initState: IPlayerItem = {
  soundUrl: '',
  id: '',
};
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
    *getPlayerDetail({payload}, {put, call}) {
      const {data}: ResponseGenerator = yield call(getPlayerDetail, {
        id: payload.id,
      });
      yield put({
        type: 'setState',
        payload: {
          id: data.id,
          soundUrl: data.soundUrl,
        },
      });
    },
  },
};
export default playerModel;
