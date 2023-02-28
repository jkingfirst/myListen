import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Index, Listen, Found, Account} from '@p/index';
import {BottomTabsParamsList} from '@t/navigation';
const Tabs = createBottomTabNavigator<BottomTabsParamsList>();
export default function BottomTabs() {
  return (
    <Tabs.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#f86442',
      }}>
      <Tabs.Screen
        name={'Index'}
        component={Index}
        options={{
          title: '首页',
        }}
      />
      <Tabs.Screen
        name={'Listen'}
        component={Listen}
        options={{
          title: '我听',
        }}
      />
      <Tabs.Screen
        name={'Found'}
        component={Found}
        options={{
          title: '发现',
        }}
      />
      <Tabs.Screen
        name={'Account'}
        component={Account}
        options={{
          title: '我的',
        }}
      />
    </Tabs.Navigator>
  );
}
