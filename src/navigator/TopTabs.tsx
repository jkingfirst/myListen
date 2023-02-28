import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Index} from '@p/index';
import {TopTabsParamsList} from '@t/navigation';
const Tab = createMaterialTopTabNavigator<TopTabsParamsList>();

export default function TopTabs() {
  return (
    <Tab.Navigator
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
          borderRadius: 1,
        },
      }}>
      <Tab.Screen name="Index" component={Index} />
    </Tab.Navigator>
  );
}
