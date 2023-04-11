import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {useMount} from '@u/customHooks';
import {useCallback, useEffect, useState} from 'react';
import BarrageItem, {IBarrage} from '@p/Album/components/Barrage/BarrageItem';
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
}
const Barrage = (props: IProps) => {
  console.log('Barrage重新渲染');
  const {isOpen, style} = props;
  const [barrages, setBarrages] = useState<IBarrage[][]>([]);
  const addBarrage = useCallback(() => {
    const list = barrages.slice();
    for (let i = 0; i <= list.length; i++) {
      if (!list[i] || list[i].length === 0) {
        list[i] = [];
      } else {
        if (!list[i][list[i].length - 1].isFree) {
          continue; // 跳出本次循环继续下一次
        }
      }
      const temp = {
        id: Date.now(),
        text: randomText(),
        trackIndex: i,
      };
      list[i].push(temp); // 每次循环只添加一次就立马退出
      break;
    }
    console.log(list, '火箭');
    setBarrages(list);
  }, [barrages]);
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
  const moveChange = useCallback((item: IBarrage) => {
    const {trackIndex} = item;
    setBarrages(prevBarrages => {
      prevBarrages[trackIndex] = prevBarrages[trackIndex].map(barrage => {
        if (barrage.id === item.id) {
          return {
            ...barrage,
            isFree: true,
          };
        } else {
          return barrage;
        }
      });
      return prevBarrages;
    });
  }, []);
  const renderItem = (list: IBarrage[]) => {
    return list.map(item => {
      return (
        <BarrageItem
          key={item.id}
          item={item}
          animateEnd={animateEnd}
          moveChange={moveChange}
        />
      );
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
