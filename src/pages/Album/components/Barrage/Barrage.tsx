import {
  Animated,
  StyleSheet,
  View,
  Text,
  Easing,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {viewWidth} from '@u/tools';
import {useMount} from '@u/customHooks';
import {useCallback, useEffect, useState} from 'react';
import BarrageItem, {
  IBarrage,
  IMessage,
} from '@p/Album/components/Barrage/BarrageItem';
import Touchable from '@c/TouchableOpacity';
const data: string[] = [
  '最灵繁的人也看不见自己的背脊',
  '朝闻道，夕死可矣',
  '阅读是人类进步的阶梯',
  '内外相应，言行相称',
  '人的一生是短的',
  '抛弃时间的人，时间也抛弃他',
  '自信在于沉稳',
  '过犹不及',
  '开卷有益',
  '有志者事竟成',
  '合理安排时间，就等于节约时间',
  '成功源于不懈的努力',
];
const random = (length: number) => Math.floor(Math.random() * length);
const randomText = () => data[random(data.length)];
interface IProps {
  isOpen: boolean;
  style?: StyleProp<ViewStyle>;
  maxTrack: number;
}
const Barrage = (props: IProps) => {
  console.log('Barrage重新渲染');
  const {isOpen, style, maxTrack} = props;
  const [barrages, setBarrages] = useState<IBarrage[][]>([]);
  const addBarrage = useCallback(() => {
    console.log(12);
    const list = barrages.slice();
    for (let i = 0; i < maxTrack; i++) {
      if (!list[i]) {
        list[i] = [];
      } else {
        if (!list[i][list[i].length - 1].isFree) {
          continue;
        }
      }
      const temp = {
        id: Date.now(),
        text: randomText(),
        trackIndex: i,
      };
      list[i].push(temp);
    }
    console.log(list, '火箭');
    setBarrages(list);
  }, [barrages, maxTrack]);
  useMount(() => {
    if (isOpen) {
      addBarrage();
    }
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      addBarrage();
    }, 500);
    return () => clearTimeout(timer);
  }, [addBarrage]);
  const animateEnd = useCallback((item: IBarrage) => {
    const {trackIndex} = item;
    setBarrages(prevBarrages => {
      prevBarrages[trackIndex] = prevBarrages[trackIndex].filter(
        barrage => barrage.id !== item.id,
      );
      return prevBarrages;
    });
  }, []);
  const renderItem = (list: IBarrage[]) => {
    return list.map(item => {
      return <BarrageItem key={item.id} item={item} animateEnd={animateEnd} />;
    });
  };
  return (
    <View style={[styles.barrageContainer, style]}>
      {barrages.map(renderItem)}
    </View>
  );
};
export default Barrage;
const styles = StyleSheet.create({
  barrageContainer: {
    position: 'absolute',
  },
});
