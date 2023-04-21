import home from '@m/home';
import category from '@m/category';
import {DvaLoadingState} from 'dva-loading-ts';
import album from '@m/album';
import player from '@m/player';
import user from '@m/user';
import found from '@m/found';
export type RootState = {
  home: typeof home.state;
  loading: DvaLoadingState;
  category: typeof category.state;
  album: typeof album.state;
  player: typeof player.state;
  user: typeof user.state;
  found: typeof found.state;
} & {
  [key: string]: typeof home.state;
};
export default [player, home, category, album, user, found];
