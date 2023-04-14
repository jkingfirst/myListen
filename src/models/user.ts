import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import {IUser} from '@t/user';
import {login, logout} from '@api/user';
import {ResponseGenerator} from '@t/home';
interface InitState {
  user: IUser | null;
}

interface UserModel extends Model {
  namespace: 'user';
  state: InitState;
  reducers: {
    setState: Reducer<InitState>;
  };
  effects: {
    login: Effect;
    logout: Effect;
  };
}
const initState: InitState = {
  user: null,
};
const userModel: UserModel = {
  namespace: 'user',
  state: initState,
  reducers: {
    setState(state: InitState = initState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *login(_, {call, put}) {
      const {data, status, msg}: ResponseGenerator = yield call(login);
      if (status === 100) {
        yield put({
          type: 'setState',
          payload: {
            user: data,
          },
        });
      } else {
        console.log(msg);
      }
    },
    *logout(_, {call, put}) {
      yield call(logout);
      yield put({
        type: 'setState',
        payload: {
          user: null,
        },
      });
    },
  },
};
export default userModel;
