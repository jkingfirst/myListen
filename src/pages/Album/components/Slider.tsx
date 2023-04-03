import Slider from 'react-native-slider-x';
import {View, Text} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {formatTime} from '@u/tools';

const mapStateToProps = ({player}: RootState) => ({
  currentTime: player.currentTime,
  duration: player.duration,
});
const connector = connect(mapStateToProps);
interface SliderProps extends ConnectedProps<typeof connector> {}
const PlaySlider = (props: SliderProps) => {
  const {currentTime, duration} = props;
  return (
    <View>
      <Text>
        {formatTime(currentTime)}/{formatTime(duration)}
      </Text>
      <Slider
        value={currentTime}
        maximumValue={duration}
        minimumTrackTintColor={'#fff'}
        maximumTrackTintColor={'rgba(255,255,255,.3)'}
      />
    </View>
  );
};
export default connector(PlaySlider);
