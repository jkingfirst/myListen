import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {Index} from '@p/index';
import {TopTabsParamsList} from '@t/navigation';
import colors from '@const/colors';
import CustomTobBar from '@n/components/customTobBar';
import {StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@m/index';
const mapStateToProps = ({home}: RootState) => ({
  gradientVisible: home.gradientVisible,
});
const connector = connect(mapStateToProps);
interface TopBarProps extends ConnectedProps<typeof connector> {}
const Tab = createMaterialTopTabNavigator<TopTabsParamsList>();
const TopTabs = (props: TopBarProps) => {
  const {gradientVisible} = props;
  const renderTabBar = (props: MaterialTopTabBarProps) => {
    return <CustomTobBar {...props} />;
  };
  let textColor = '#333';
  if (gradientVisible) {
    textColor = '#fff';
  }
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={{
        lazy: true,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 80,
          backgroundColor: 'transparent',
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
        },
        tabBarIndicatorStyle: {
          width: 20,
          height: 5,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: colors.primary,
        },
        tabBarActiveTintColor: gradientVisible ? textColor : colors.primary,
        tabBarInactiveTintColor: colors.black,
      }}>
      <Tab.Screen
        name="index"
        component={Index}
        options={{
          tabBarLabel: '推荐',
        }}
      />
    </Tab.Navigator>
  );
};
export default connector(TopTabs);
const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});
