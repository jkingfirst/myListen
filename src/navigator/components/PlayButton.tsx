import {Image, StyleSheet, Animated, Easing} from 'react-native';
import Touchable from '@c/TouchableOpacity';
import IconFont from '@assets/iconfont';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {useMount} from '@u/customHooks';
import PlayProgress from '@n/components/PlayProgress';
import {useEffect, useMemo} from 'react';
const mapStateToProps = ({player}: RootState) => {
  return {
    thumbnailUrl: player.thumbnailUrl,
    playStatus: player.playStatus,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  onPress: () => void;
}
const PlayButton = (props: IProps) => {
  const {thumbnailUrl, onPress, playStatus} = props;
  const animate = useMemo(() => new Animated.Value(0), []);
  const rotate = animate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const timing = Animated.loop(
    Animated.timing(animate, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  );
  const handlePress = () => {
    if (thumbnailUrl) {
      onPress();
    }
  };
  useEffect(() => {
    if (playStatus === 'playing') {
      timing.start();
    } else {
      timing.stop();
    }
  }, [playStatus, timing]);
  return (
    <Touchable style={styles.container} onPress={handlePress}>
      {thumbnailUrl ? (
        <PlayProgress>
          <Animated.Image
            source={{
              uri: thumbnailUrl,
            }}
            style={[
              styles.image,
              {
                transform: [
                  {
                    rotate: rotate,
                  },
                ],
              },
            ]}
          />
        </PlayProgress>
      ) : (
        <IconFont name={'icon-play'} size={42} color={'#666'} />
      )}
    </Touchable>
  );
};
const Btn = connector(PlayButton);
export default function PlayBtn(props: any) {
  return <Btn {...props} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },
});
