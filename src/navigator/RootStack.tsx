import {
  NavigationContainer,
  NavigationState,
  RouteProp,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Album} from '@p/index';
import {Play} from '@p/index';
import BottomTabs from '@n/BottomTabs';
import {RootStackParamsList, ModelRootStackParamsList} from '@t/navigation';
import Category from '@p/Category/Category';
import {Animated, StyleSheet} from 'react-native';
import View = Animated.View;
import IconFont from '@assets/iconfont';
import GlobalPlayButton from '@n/components/GlobalPlayButton';
import {useState} from 'react';
import {getActiveRouteName} from '@u/tools';
import Login from '@p/Login/Login';
//最底层的路由，包括全屏路由
const ModalStack = createNativeStackNavigator<ModelRootStackParamsList>();
const Stack = createNativeStackNavigator<RootStackParamsList>();
function StackNavigator() {
  const getAlbumOptions = ({
    route,
  }: {
    route: RouteProp<RootStackParamsList, 'Album'>;
  }) => {
    return {
      headerTitle: route.params.item.title,
      headerTransparent: true,
      headerStyle: {backgroundColor: 'transparent'},
      headerBackground: renderHeaderBackground,
    };
  };
  // 渲染头部北京
  const renderHeaderBackground = () => {
    return <View style={styles.headerBackground} />;
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        gestureEnabled: true,
        animation: 'slide_from_right',
        headerBackVisible: true,
        headerTintColor: '#333',
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: '#0ff'},
        }}
        name="BottomTabs"
        component={BottomTabs}
      />
      <Stack.Screen options={getAlbumOptions} name="Album" component={Album} />
      <Stack.Screen
        name={'Category'}
        component={Category}
        options={{
          headerTitle: '分类',
        }}
      />
    </Stack.Navigator>
  );
}
const BackImage = (props: {color: string}) => {
  return <IconFont name={'icon-down'} size={30} color={props.color} />;
};
const ModalScreen = () => {
  return (
    <ModalStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <ModalStack.Screen
        name={'Root'}
        component={StackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <ModalStack.Screen
        name={'Play'}
        component={Play}
        options={{
          animation: 'slide_from_bottom',
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitle: '',
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <ModalStack.Screen
        name={'Login'}
        component={Login}
        options={{
          animation: 'slide_from_bottom',
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitle: '登录',
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
    </ModalStack.Navigator>
  );
};
export default function RootStack() {
  const [routeName, setRouteName] = useState('');
  const onStateChange = (state: NavigationState | undefined) => {
    if (state) {
      const name = getActiveRouteName(state);
      setRouteName(name);
    }
  };
  return (
    <NavigationContainer onStateChange={onStateChange}>
      <ModalScreen />
      <GlobalPlayButton routeName={routeName} />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerBackground: {
    opacity: 0,
  },
});
