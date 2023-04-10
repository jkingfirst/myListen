import {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {useMount} from '@u/customHooks';
import {RouteProp} from '@react-navigation/native';
import {ModelRootStackParamsList} from '@t/navigation';
import IconFont from '@assets/iconfont';
import Touchable from '@c/TouchableOpacity';
import Slider from '@p/Album/components/Slider';
import LinearGradient from 'react-native-linear-gradient';
import {viewWidth} from '@u/tools';
import Barrage from '@p/Album/components/Barrage/Barrage';
const IMAGE_WIDTH = 180;
const PADDING_TOP = (viewWidth - IMAGE_WIDTH) / 2;
const mapStateToProps = ({player, album}: RootState) => ({
  playStatus: player.playStatus,
  list: album.list,
  thumbnailUrl: player.thumbnailUrl,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IPlay extends ModelState {
  route: RouteProp<ModelRootStackParamsList, 'Play'>;
}
const Play = (props: IPlay) => {
  const {dispatch, route, playStatus, thumbnailUrl} = props;
  useMount(() => {
    dispatch({
      type: 'player/getPlayerDetail',
      payload: {
        id: route.params.id,
      },
    });
  });
  const togglePlay = () => {
    dispatch({
      type: playStatus === 'playing' ? 'player/pause' : 'player/play',
    });
  };
  const switchSongs = (flg: number) => {
    dispatch({
      type: `player/${flg === 1 ? 'previous' : 'next'}`,
    });
  };
  const [isOpen, setIsOpen] = useState(false);
  const scale = useMemo(() => new Animated.Value(1), []);
  const toggleBarrage = () => {
    setIsOpen(isOpen => !isOpen);
  };
  useEffect(() => {
    Animated.timing(scale, {
      toValue: isOpen ? viewWidth / IMAGE_WIDTH : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen, scale]);
  return (
    <View style={[styles.container]}>
      <View style={[styles.imageView]}>
        <Animated.Image
          style={[
            styles.image,
            {
              borderRadius: isOpen ? 0 : 8,
              transform: [
                {
                  scale: scale,
                },
              ],
            },
          ]}
          source={{
            uri: thumbnailUrl,
          }}
        />
      </View>
      {isOpen ? (
        <>
          <LinearGradient
            colors={['rgba(128,104,102,0.5)', '#807c66']}
            style={styles.linearGradient}
          />
          <Barrage isOpen={isOpen} style={styles.barrage} maxTrack={5} />
        </>
      ) : null}
      <Touchable style={styles.barrageBtn} onPress={toggleBarrage}>
        <Text style={styles.barrageText}>弹幕</Text>
      </Touchable>
      <Slider />
      <View style={styles.buttonView}>
        <Touchable onPress={() => switchSongs(1)}>
          <IconFont name={'icon-previous'} size={30} color={'#fff'} />
        </Touchable>
        <Touchable onPress={togglePlay}>
          <IconFont
            name={playStatus === 'playing' ? 'icon-pause' : 'icon-play'}
            size={45}
            color={'#fff'}
          />
        </Touchable>
        <Touchable onPress={() => switchSongs(2)}>
          <IconFont name={'icon-next'} size={30} color={'#fff'} />
        </Touchable>
      </View>
    </View>
  );
};
export default connector(Play);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#807c66',
    flex: 1,
    paddingTop: PADDING_TOP,
  },
  imageView: {
    flexDirection: 'row',
    height: IMAGE_WIDTH,
    justifyContent: 'center',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 100,
  },
  barrageBtn: {
    paddingHorizontal: 20,
  },
  barrageText: {
    color: '#fff',
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: viewWidth,
    height: viewWidth,
  },
  barrage: {
    top: PADDING_TOP,
  },
});
