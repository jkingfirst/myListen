import home from '@m/home';
import category from '@m/category';
import {DvaLoadingState} from 'dva-loading-ts';

export type RootState = {
  home: typeof home.state;
  loading: DvaLoadingState;
  category: typeof category.state;
};
export default [home, category];
