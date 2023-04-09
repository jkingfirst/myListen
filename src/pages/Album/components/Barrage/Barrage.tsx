import {Animated, StyleSheet, View, Text, Easing} from 'react-native';
import {viewWidth} from '@u/tools';
import {useMount} from '@u/customHooks';
import {useCallback, useEffect, useState} from 'react';
import BarrageItem, {IBarrage} from '@p/Album/components/Barrage/BarrageItem';
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
}
const Barrage = (props: IProps) => {
  console.log('Barrage重新渲染');
  const {isOpen} = props;
  const [barrages, setBarrages] = useState<IBarrage[]>([]);
  const addBarrage = useCallback(() => {
    const list = barrages.slice();
    const temp = {
      id: Date.now(),
      text: randomText(),
    };
    list.push(temp);
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
    }, 1000);
    return () => clearTimeout(timer);
  }, [addBarrage]);
  const renderItem = (item: IBarrage) => {
    return <BarrageItem key={item.id} item={item} />;
  };
  return <View>{barrages.map(renderItem)}</View>;
};
export default Barrage;
