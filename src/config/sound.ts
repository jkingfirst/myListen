import Sound from 'react-native-sound';
Sound.setCategory('Playback'); // 开启静音模式也能播放
let sound: Sound;
//创建播放器
const init = (soundUrl: string) => {
  return new Promise<void>((resolve, reject) => {
    sound = new Sound(soundUrl, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
const play = () => {
  return new Promise<void>((resolve, reject) => {
    if (sound) {
      sound.play(success => {
        // 直到播放完成才会返回结果
        if (success) {
          resolve();
        } else {
          reject();
        }
      });
    } else {
      reject();
    }
  });
};
// 获取当前歌曲播放时间
const getSoundCurrentTime = () => {
  return new Promise((resolve, reject) => {
    if (sound && sound.isLoaded()) {
      sound.getCurrentTime(resolve);
    } else {
      reject();
    }
  });
};
// 获取歌曲时长
const getDuration = () => {
  if (sound) {
    return sound.getDuration();
  } else {
    return 0;
  }
};
export default [init, play, getSoundCurrentTime, getDuration];
