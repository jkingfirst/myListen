import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
interface homeModel extends Model {
  namespace: 'home';
  state: {
    num: number;
  };
  reducers?: {
    // 同步动作，
    add: Reducer<homeModel['state']>;
  };
  effect?: {
    addAsync: Effect;
  };
}
const home: homeModel = {
  namespace: 'home',
  state: {
    num: 0,
  },
  reducers: {
    add(state = {num: 0}, {payload}) {
      return {
        ...state,
        num: state.num + payload.num,
      };
    },
  },
};
export default home;
