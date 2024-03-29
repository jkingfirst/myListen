import {ICategory} from '@t/category';
import {Reducer} from 'redux';
import {Effect, Model, SubscriptionsMapObject} from 'dva-core-ts';
import storage, {load} from '@conf/storage';
import {ResponseGenerator} from '@t/home';
import {getCategoryList} from '@api/category';
import {RootState} from '@m/index';
interface IState {
  isEdit: boolean;
  myCategories: ICategory[];
  allCategories: ICategory[];
}
interface CategoryModel extends Model {
  namespace: 'category';
  state: IState;
  reducers: {
    setState: Reducer<IState>;
  };
  effects: {
    loadData: Effect;
    toggleEdit: Effect;
  };
  subscriptions: SubscriptionsMapObject; //订阅一个数据源，根据需要dispatch对应的action, 一般在dva app.start（）时候调用
}
const initState: IState = {
  isEdit: false,
  myCategories: [
    {name: '推荐', id: 'home'},
    {name: 'VIP', id: 'vip'},
  ],
  allCategories: [],
};
const categoryModel: CategoryModel = {
  namespace: 'category',
  state: initState,
  reducers: {
    setState(state: IState = initState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *loadData(_, {call, put}) {
      const allCategories: ResponseGenerator = yield call(load, {
        key: 'allCategories',
        syncInBackground: true,
      });
      const myCategories: ResponseGenerator = yield call(load, {
        // 如果没有找到对应的数据，就会调用storage中sync对象中和key值相同函数名字的方法
        key: 'myCategories',
      });
      if (myCategories) {
        yield put({
          type: 'setState',
          payload: {
            myCategories,
            allCategories,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            allCategories,
          },
        });
      }
    },
    *toggleEdit({payload}, {put, select}) {
      const category: IState = yield select(
        ({category}: RootState) => category,
      );
      const {myCategories} = payload;
      console.log(myCategories, '++++++++');
      yield put({
        type: 'setState',
        payload: {
          myCategories: myCategories,
          isEdit: !category.isEdit,
        },
      });
      if (category.isEdit) {
        storage.save({
          key: 'myCategories',
          data: myCategories,
        });
      }
    },
  },
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'loadData'});
    },
    asyncStorage() {
      // 在storage.ts中的storage对象的sync添加方法
      storage.sync.allCategories = async () => {
        let {data} = await getCategoryList();
        return data;
      };
      storage.sync.myCategories = async () => {
        return null;
      };
    },
  },
};
export default categoryModel;
