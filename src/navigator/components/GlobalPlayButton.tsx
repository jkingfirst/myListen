import PlayBtn from '@n/components/PlayButton';
import {View, Platform, StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
import {viewWidth} from '@u/tools';
import {useNavigation} from '@react-navigation/native';
import {GlobalScreenNavigationProp} from '@t/navigation';
import {useEffect, useState} from 'react';
import {useMount} from '@u/customHooks';
const mapStateToProps = ({player}: RootState) => {
  return {
    playStatus: player.playStatus,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  routeName: string;
}
const GlobalPlayButton = (props: IProps) => {
  const {routeName, playStatus} = props;
  console.log(routeName, 'route🚀');
  const [show, setShow] = useState(false);
  const navigation = useNavigation<GlobalScreenNavigationProp>();
  useEffect(() => {
    setShow(
      routeName !== 'Root' && routeName !== 'Play' && playStatus === 'playing',
    );
  }, [routeName, playStatus]);
  const goPlay = () => {
    // @ts-ignore TODO
    navigation.navigate('Play');
  };
  return show ? (
    <View style={styles.container}>
      <PlayBtn onPress={goPlay} />
    </View>
  ) : null;
};
export default connector(GlobalPlayButton);
const width = 50;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: width + 20,
    bottom: 0,
    left: (viewWidth - width) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 4,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.85,
        shadowRadius: 5,
        shadowOffset: {
          width: StyleSheet.hairlineWidth,
          height: StyleSheet.hairlineWidth,
        },
      },
    }),
  },
});
