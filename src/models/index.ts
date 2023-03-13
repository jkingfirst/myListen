import home from '@m/home';
import {DvaLoadingState} from 'dva-loading-ts';

export type RootState = {
  home: typeof home.state;
  loading: DvaLoadingState;
};
export default [home];
