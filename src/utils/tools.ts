import {Dimensions} from 'react-native';
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
// const formatDate = (
//   timestamp: number | string,
//   format: string = 'yyyy-MM-DD hh-mm-ss',
// ) => {
//   const date = new Date(timestamp);
//   const year = date.getFullYear();
//   let month = date.getMonth();
//   month = month + 1 < 10 ? `0${month + 1}` : `${month}`;
//   let day = date.getDate();
//   day = day < 10 ? `0${day}` : `${day}`;
//   let h;
// };
/**
 * Created by Administrator on 2017/10/18 0018.
 */
const formatDate = (
  timestmap: string | number,
  fmt: string = 'YYYY-MM-DD hh:mm:ss',
) => {
  let data = new Date(timestmap);
  if (/(Y+)/.test(fmt)) {
    fmt = fmt
      .replace(RegExp.$1, data.getFullYear() + '')
      .substr(4 - RegExp.$1.length);
  }
  type O = Record<string, number>;
  let o: O = {
    'M+': data.getMonth() + 1,
    'D+': data.getDate(),
    'h+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getSeconds(),
  };
  for (let k in o) {
    let str = o[k] + '';
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str),
      );
    }
  }
  return fmt;
};
const padLeftZero = (str: string) => {
  return ('00' + str).substr(str.length);
};
const formatTime = (seconds: number) => {
  const m = parseInt((seconds % (60 * 60)) / 60 + '', 10);
  const s = parseInt((seconds % 60) + '', 10);
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
};
export {
  viewWidth,
  viewHeight,
  getScreenSize,
  cbMidWare,
  getActiveRouteName,
  formatDate,
  padLeftZero,
  formatTime,
};
