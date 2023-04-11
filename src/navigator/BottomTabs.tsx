import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Listen, Found, Account} from '@p/index';
import TopTabs from '@n/TopTabs';
import {BottomTabsParamsList, BottomTabNavigation} from '@t/navigation';
import IconFont from '@assets/iconfont';
import colors from '@const/colors';
import {useMount} from '@u/customHooks';
import PlayBtn from '@n/components/PlayButton';
const Tabs = createBottomTabNavigator<BottomTabsParamsList>();
interface BottomProps {
  navigation: BottomTabNavigation;
}
export default function BottomTabs(props: BottomProps) {
  const {navigation} = props;
  useMount(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: 'helle',
    });
  });
  return (
    <Tabs.Navigator
      initialRouteName={'TopTabs'}
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: colors.primary,
      }}>
      <Tabs.Screen
        name={'TopTabs'}
        component={TopTabs}
        options={{
          title: '首页',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <IconFont name={'icon-home'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={'listen'}
        component={Listen}
        options={{
          title: '我听',
          tabBarIcon: ({color}) => (
            <IconFont name={'icon-listen'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={'playButton'}
        component={PlayBtn}
        options={({navigation}) => ({
          tabBarButton: () => {
            return <PlayBtn onPress={() => navigation.navigate('Play')} />;
          },
        })}
      />
      <Tabs.Screen
        name={'found'}
        component={Found}
        options={{
          title: '发现',
          tabBarIcon: ({color}) => (
            <IconFont name={'icon-found'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={'account'}
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
