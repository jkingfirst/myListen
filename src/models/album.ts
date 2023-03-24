import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {AlbumState} from '@t/album';
import {ResponseGenerator} from '@t/home';
import {getAlbumDetail} from '@api/album';

interface AlbumModel extends Model {
  namespace: 'album';
  state: AlbumState;
  reducers: {
    setState: Reducer<AlbumState>;
  };
  effects: {
    getAlbum: Effect;
  };
}
const initState: AlbumState = {
  id: '',
  title: '',
  summary: '',
  thumbnailUrl: '',
  introduction: '',
  author: {
    name: '',
    avatar: '',
  },
  list: [],
};
const albumModel: AlbumModel = {
  namespace: 'album',
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
    *getAlbum({payload}, {put, call}) {
      const {data}: ResponseGenerator = yield call(getAlbumDetail, {
        id: payload.id,
      });
      yield put({
        type: 'setState',
        payload: {
          list: data,
        },
      });
    },
  },
};
export default albumModel;
