import SnapCarousel, {
  ParallaxImage,
  Pagination,
  AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import {Carousel} from '@t/home';
import {viewWidth, getScreenSize} from '@u/tools';
import {View, StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {RootStackNavigation} from '@t/navigation';
import {useEffect} from 'react';
const mapStateToProps = (state: RootState, props: {namespace: string}) => {
  const {namespace} = props;
  const modelState = state[namespace];
  return {
    namespace,
    carousels: modelState.carousels,
    activeCarouselsIndex: modelState.activeCarouselsIndex,
  };
};
interface CarouselsProps extends ConnectedProps<typeof connector> {
  namespace: string;
  navigation: RootStackNavigation;
}
const connector = connect(mapStateToProps);
let sliderWidth = viewWidth;
let itemWidth = getScreenSize(90, 'width');
export let itemHeight = getScreenSize(26, 'height');
const Carousels = (props: CarouselsProps) => {
  const {
    activeCarouselsIndex: activeDotIndex,
    carousels,
    dispatch,
    namespace,
    navigation,
  } = props;
  const renderPagination = () => {
    return (
      <View style={styles.pagWrapper}>
        <Pagination
          containerStyle={styles.pagContainer}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dotStyle}
          dotsLength={carousels.length}
          activeDotIndex={activeDotIndex}
        />
      </View>
    );
  };
  const onSnapToItem = (index: number) => {
    dispatch({
      type: `${namespace}/setState`,
      payload: {
        activeCarouselsIndex: index,
      },
    });
  };
  const renderItem = (
    {item}: {item: Carousel},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <>
        <ParallaxImage
          source={{uri: item.image}}
          style={styles.image}
          containerStyle={styles.imageContainer}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        {renderPagination()}
      </>
    );
  };
  return (
    <SnapCarousel
      data={carousels}
      onSnapToItem={onSnapToItem}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      hasParallaxImages={true}
      autoplay={true}
    />
  );
};
export default connector(Carousels);
const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: itemHeight,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  pagWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
});
