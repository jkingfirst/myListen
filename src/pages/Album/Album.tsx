import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {connect, ConnectedProps} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
import {RootState} from '@m/index';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamsList} from '@t/navigation';
import {useMount} from '@u/customHooks';
import Tab from './components/Tab';
import Example from '@p/Album/components/Test';
const mapStateToProps = ({album}: RootState) => ({
  author: album.author,
  summary: album.summary,
  list: album.list,
});
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
const connector = connect(mapStateToProps);
type ModeState = ConnectedProps<typeof connector>;
interface AlbumProps extends ModeState {
  route: RouteProp<RootStackParamsList, 'Album'>;
}
const AlbumHeight = 260;
const Album = (props: AlbumProps) => {
  const {author, summary, route, dispatch} = props;
  const {title, image, id} = route.params.item;
  const headerHeight = useHeaderHeight();
  const MAX_OFFSET = 260 - headerHeight;
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({translateY: 0});
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withSpring(offset.value.translateY)}],
    };
  });
  const gesture = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      isPressed.value = true;
    })
    .onChange(
      (
        event: GestureUpdateEvent<
          PanGestureHandlerEventPayload & PanGestureChangeEventPayload
        >,
      ) => {
        'worklet';
        console.log(event.translationY, '++++++++');
        console.log(offset.value.translateY, '-------');
        console.log(MAX_OFFSET, 'offset');
        console.log(event, 'event');
        offset.value = {
          translateY:
            offset.value.translateY > -MAX_OFFSET
              ? event.changeY + offset.value.translateY
              : -MAX_OFFSET,
        };
      },
    )
    .onFinalize(() => {
      'worklet';
      isPressed.value = false;
    });
  useMount(() => {
    dispatch({
      type: 'album/getAlbum',
      payload: {
        id,
      },
    });
  });
  const renderThumbnail = () => (
    <View
      style={[
        styles.headerWrapper,
        {
          paddingTop: headerHeight,
        },
      ]}>
      <Image source={{uri: image}} style={styles.background} />
      <BlurView
        blurType="light"
        blurAmount={10}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.leftView}>
        <Image source={{uri: image}} style={styles.thumbnail} />
      </View>
      <View style={styles.rightView}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.summary}>
          <Text numberOfLines={1} style={styles.summaryText}>
            {summary}
          </Text>
        </View>
        <View style={styles.author}>
          <Image
            source={{
              uri: author.avatar,
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{author.name}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.AlbumWrapper}>
        <Animated.View style={[styles.AlbumWrapper, animatedStyles]}>
          {renderThumbnail()}
          <Tab />
        </Animated.View>
      </View>
    </GestureDetector>
    // <View style={styles.AlbumWrapper}>
    //   <Example />
    // </View>
  );
};
export default connector(Album);
const styles = StyleSheet.create({
  AlbumWrapper: {
    display: 'flex',
    flex: 1,
  },
  headerWrapper: {
    height: AlbumHeight,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eee',
  },
  leftView: {
    marginRight: 26,
  },
  thumbnail: {
    width: 98,
    height: 98,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  coverRight: {
    height: 98,
    position: 'absolute',
    right: -23,
    resizeMode: 'contain',
  },
  rightView: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  summary: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  summaryText: {
    color: '#fff',
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  name: {
    color: '#fff',
  },
});
