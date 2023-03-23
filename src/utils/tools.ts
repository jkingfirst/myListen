import {Dimensions} from 'react-native';
import {RootStackNavigation} from '@t/navigation';
import {NavigationState} from '@react-navigation/native';
const {width: viewWidth, height: viewHeight} = Dimensions.get('window');
// 更具百分比计算宽高
type ScreenType = 'width' | 'height';
const getScreenSize = (percent: number, type: ScreenType = 'width'): number => {
  if (type === 'width') {
    return Math.round((viewWidth * percent) / 100);
  } else {
    return Math.round((viewHeight * percent) / 100);
  }
};
const cbMidWare = <T>(cb: (params?: T) => {}, params?: T) => {
  if (Object.prototype.toString.call(cb) === '[object Function]') {
    cb(params);
  }
};
const getActiveRouteName = (state: NavigationState) => {
  let route;
  route = state.routes[state.index];
  while (route.state && route.state.index) {
    route = route.state.routes[route.state.index];
  }
  return route.name;
};
export {viewWidth, viewHeight, getScreenSize, cbMidWare, getActiveRouteName};
