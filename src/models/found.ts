import {Model, Effect} from 'dva-core-ts';
import {ResponseGenerator} from '@t/home';
import {getFoundList} from '@api/found';
import {cbMidWare} from '@u/tools';
interface FoundMode extends Model {
  namespace: 'found';
  effects: {
    getFoundList: Effect;
  };
}
const foundModel: FoundMode = {
  namespace: 'found',
  state: {},
  effects: {
    *getFoundList({cb}, {call}) {
      const {data}: ResponseGenerator = yield call(getFoundList);
      cbMidWare(cb, data);
    },
  },
};
export default foundModel;
