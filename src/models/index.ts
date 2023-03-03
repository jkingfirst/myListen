import home from '@m/home';

export type RootState = {
  home: typeof home.state;
};
export default [home];
