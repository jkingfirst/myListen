import {memo} from 'react';
import {Animated, StyleSheet, Text, Easing} from 'react-native';
import {viewWidth} from '@u/tools';
import {useMount} from '@u/customHooks';
export interface IMessage {
  id: number;
  text: string;
}
export interface IBarrage extends IMessage {
  isFree?: boolean;
  trackIndex: number;
}
interface IProps {
  item: IBarrage;
  animateEnd: (item: IBarrage) => void;
}
const BarrageItem = (props: IProps) => {
  const {item, animateEnd} = props;
  const translateX = new Animated.Value(0);
  useMount(() => {
    console.log('动画');
    Animated.timing(translateX, {
      toValue: 10,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        console.log(123);
        animateEnd(item);
      }
    });
  });
  translateX.addListener(({value}) => {
    if (value > 4) {
      item.isFree = true;
    }
  });
  const titleWidth = 15 * item.text.length;
  return (
    <Animated.View
      style={[
        styles.barrage,
        {
          top: item.trackIndex * 30,
        },
        {
          transform: [
            {
              translateX: translateX.interpolate({
                inputRange: [0, 10],
                outputRange: [viewWidth, -titleWidth],
              }),
            },
          ],
        },
      ]}>
      <Text>{item.text}</Text>
    </Animated.View>
  );
};
const areEqual = (prevProps: any, nextProps: any) =>
  prevProps.someprop === nextProps.someprop;
export default memo(BarrageItem);
const styles = StyleSheet.create({
  barrage: {
    position: 'absolute',
  },
});
