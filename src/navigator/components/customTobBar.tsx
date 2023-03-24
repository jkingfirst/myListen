import {
  MaterialTopTabBarProps,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {connect, ConnectedProps} from 'react-redux';
import Touchable from '@c/TouchableOpacity';
import LinearGradient from 'react-native-linear-gradient';
import {RootState} from '@m/index';
import {getActiveRouteName} from '@u/tools';
import {useEffect} from 'react';
import {RootStackNavigation} from '@t/navigation';
const mapStateToProps = (state: RootState, props: MaterialTopTabBarProps) => {
  let routeName = getActiveRouteName(props.state);
  const modelState = state[routeName];

  return {
    carousels: modelState.carousels,
    activeCarouselsIndex: modelState.activeCarouselsIndex,
    gradientVisible: modelState.gradientVisible,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
type CProps = MaterialTopTabBarProps & ModelState;

const CustomTobBar = (props: CProps) => {
  const {
    carousels,
    activeCarouselsIndex,
    gradientVisible,
    navigation,
    ...restProps
  } = props;
  const colorsArr =
    carousels.length > 0
      ? carousels[activeCarouselsIndex].colors
      : ['#333', '#999'];
  let textStyle = styles.textGradientInvisible;
  if (gradientVisible) {
    textStyle = styles.textGradientVisible;
  }
  const getLinearCom = () => {
    if (gradientVisible) {
      return (
        <LinearGradient colors={colorsArr} style={styles.gradientContainer} />
      );
    }
    return null;
  };
  const handleToPress = () => {
    navigation.navigate('Category');
  };
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => (
        <View style={{paddingTop: insets?.top, backgroundColor: 'transparent'}}>
          {getLinearCom()}
          <View style={styles.topBarView}>
            <View style={styles.tobBar}>
              <MaterialTopTabBar {...restProps} navigation={navigation} />
            </View>
            <Touchable style={styles.category} onPress={handleToPress}>
              <Text style={textStyle}>分类</Text>
            </Touchable>
          </View>
          <View style={styles.bottom}>
            <Touchable style={styles.searchBtn}>
              <Text style={textStyle}>搜索</Text>
            </Touchable>
            <Touchable style={styles.historyBtn}>
              <Text style={textStyle}>历史记录</Text>
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
  textGradientVisible: {
    color: '#fff',
  },
  textGradientInvisible: {
    color: '#333',
  },
});
