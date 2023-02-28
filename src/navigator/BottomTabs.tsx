import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Listen, Found, Account} from '@p/index';
import TopTabs from '@n/TopTabs';
import {BottomTabsParamsList} from '@t/navigation';
import IconFont from '@assets/iconfont';
import COLORS from '@cons/colors';
const Tabs = createBottomTabNavigator<BottomTabsParamsList>();
export default function BottomTabs() {
  return (
    <Tabs.Navigator
      initialRouteName="TopTabs"
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: COLORS.primary,
      }}>
      <Tabs.Screen
        name={'TopTabs'}
        component={TopTabs}
        options={{
          title: '首页',
          tabBarIcon: ({color}) => (
            <IconFont name={'icon-home'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={'Listen'}
        component={Listen}
        options={{
          title: '我听',
          tabBarIcon: ({color}) => (
            <IconFont name={'icon-listen'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={'Found'}
        component={Found}
        options={{
          title: '发现',
          tabBarIcon: ({color}) => (
            <IconFont name={'icon-found'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={'Account'}
        component={Account}
        options={{
          title: '我的',
          tabBarIcon: ({color}) => (
            <IconFont name={'icon-account'} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
