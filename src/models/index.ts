import home from '@m/home';
import category from '@m/category';
import {DvaLoadingState} from 'dva-loading-ts';
import album from '@m/album';
export type RootState = {
  home: typeof home.state;
  loading: DvaLoadingState;
  category: typeof category.state;
  album: typeof album.state;
} & {
  [key: string]: typeof home.state;
};
export default [home, category, album];
