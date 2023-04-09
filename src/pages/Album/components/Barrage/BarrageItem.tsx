import {memo} from 'react';
import {Animated, StyleSheet, Text, Easing} from 'react-native';
import {viewWidth} from '@u/tools';
import {useMount} from '@u/customHooks';
export interface IBarrage {
  id: number;
  text: string;
}
interface IProps {
  item: IBarrage;
}
const BarrageItem = (props: IProps) => {
  const {item} = props;
  const translateX = new Animated.Value(0);
  useMount(() => {
    console.log('动画');
    Animated.timing(translateX, {
      toValue: 10,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      console.log('end', finished);
    });
  });
  const titleWidth = 15 * item.text.length;
  return (
    <Animated.View
      style={[
        styles.barrage,
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
export default memo(BarrageItem);
const styles = StyleSheet.create({
  barrage: {},
});
