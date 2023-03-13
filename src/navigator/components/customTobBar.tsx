import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {connect, ConnectedProps} from 'react-redux';
import Touchable from '@c/TouchableOpacity';
import LinearGradient from 'react-native-linear-gradient';
import {RootState} from '@m/index';
const mapStateToProps = ({home}: RootState) => ({
  carousels: home.carousels,
  activeCarouselsIndex: home.activeCarouselsIndex,
  gradientVisible: home.gradientVisible,
});
const connector = connect(mapStateToProps);
type modelState = ConnectedProps<typeof connector>;
type CProps = MaterialTopTabBarProps & modelState;

const CustomTobBar = (props: CProps) => {
  const {carousels, activeCarouselsIndex, gradientVisible} = props;
  const colors =
    carousels.length > 0
      ? carousels[activeCarouselsIndex].colors
      : ['#333', '#999'];
  const getLinearCom = () => {
    if (gradientVisible) {
      return (
        <LinearGradient colors={colors} style={styles.gradientContainer} />
      );
    }
    return null;
  };
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => (
        <View style={{paddingTop: insets?.top, backgroundColor: '#fff'}}>
          {getLinearCom()}
          <View style={styles.topBarView}>
            <View style={styles.tobBar}>
              <MaterialTopTabBar {...props} />
            </View>
            <Touchable style={styles.category}>
              <Text>分类</Text>
            </Touchable>
          </View>
          <View style={styles.bottom}>
            <Touchable style={styles.searchBtn}>
              <Text>搜索</Text>
            </Touchable>
            <Touchable style={styles.historyBtn}>
              <Text>历史记录</Text>
            </Touchable>
          </View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};
export default connector(CustomTobBar);
const styles = StyleSheet.create({
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  topBarView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tobBar: {
    flex: 1,
    elevation: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  category: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
    paddingHorizontal: 10,
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  historyBtn: {
    marginLeft: 24,
  },
  container: {
    backgroundColor: '#fff',
  },
});
