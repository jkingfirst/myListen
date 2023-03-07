import SnapCarousel, {
  ParallaxImage,
  Pagination,
  AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import {Carousel} from '@t/home';
import {viewWidth, getScreenSize} from '@u/tools';
import {View, StyleSheet} from 'react-native';
import {useState} from 'react';
interface CarouselProps {
  data: Carousel[];
}
let sliderWidth = viewWidth;
let itemWidth = getScreenSize(90, 'width');
let itemHeight = getScreenSize(26, 'height');
export default function Carousels({data}: CarouselProps) {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const renderPagination = () => {
    return (
      <View style={styles.pagWrapper}>
        <Pagination
          containerStyle={styles.pagContainer}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dotStyle}
          dotsLength={data.length}
          activeDotIndex={activeDotIndex}
        />
      </View>
    );
  };
  const onSnapToItem = (index: number) => {
    setActiveDotIndex(index);
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
      data={data}
      onSnapToItem={onSnapToItem}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      hasParallaxImages={true}
      autoplay={true}
    />
  );
}
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
