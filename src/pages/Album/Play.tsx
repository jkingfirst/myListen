import {View, Text, StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {useMount} from '@u/customHooks';
import {RouteProp} from '@react-navigation/native';
import {ModelRootStackParamsList} from '@t/navigation';
import IconFont from '@assets/iconfont';
import Touchable from '@c/TouchableOpacity';
import Slider from '@p/Album/components/Slider';
const mapStateToProps = ({player}: RootState) => ({
  playStatus: player.playStatus,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IPlay extends ModelState {
  route: RouteProp<ModelRootStackParamsList, 'Play'>;
}
const Play = (props: IPlay) => {
  const {dispatch, route, playStatus} = props;
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
  return (
    <View style={[styles.container]}>
      <Slider />
      <Touchable onPress={togglePlay}>
        <IconFont
          name={playStatus === 'playing' ? 'icon-play' : 'icon-pause'}
          size={80}
          color={'#fff'}
        />
      </Touchable>
    </View>
  );
};
export default connector(Play);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#807c66',
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 10,
  },
});
