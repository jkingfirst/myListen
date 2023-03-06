import SnapCarousel from 'react-native-snap-carousel';
import {Carousel} from '@t/home';
import {viewWidth, getScreenSize} from '@u/tools';
import {StyleSheet, Image} from 'react-native';
interface CarouselProps {
  data: Carousel[];
}
let sliderWidth = viewWidth;
let itemWidth = getScreenSize(90, 'width');
let itemHeight = getScreenSize(26, 'height');
export default function Carousels({data}: CarouselProps) {
  const renderItem = ({item}: {item: Carousel}) => {
    return <Image source={{uri: item.image}} style={styles.image} />;
  };
  return (
    <SnapCarousel
      data={data}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
    />
  );
}
const styles = StyleSheet.create({
  image: {
    width: itemWidth,
    height: itemHeight,
    borderRadius: 5,
  },
});
