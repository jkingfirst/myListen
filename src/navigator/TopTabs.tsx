import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {Index} from '@p/index';
import {TopTabsParamsList} from '@t/navigation';
import colors from '@const/colors';
import CustomTobBar from '@n/components/customTobBar';
import {StyleSheet} from 'react-native';
const Tab = createMaterialTopTabNavigator<TopTabsParamsList>();
export default function TopTabs() {
  const renderTabBar = (props: MaterialTopTabBarProps) => {
    return <CustomTobBar {...props} />;
  };
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={{
        lazy: true,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 80,
        },
        tabBarIndicatorStyle: {
          width: 20,
          height: 5,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: colors.primary,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.black,
      }}>
      <Tab.Screen name="index" component={Index} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});
