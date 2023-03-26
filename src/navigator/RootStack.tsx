import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Album} from '@p/index';
import BottomTabs from '@n/BottomTabs';
import {RootStackParamsList} from '@t/navigation';

import Category from '@p/Category/Category';
import {Animated, StyleSheet} from 'react-native';
import View = Animated.View;
const Stack = createNativeStackNavigator<RootStackParamsList>();
export default function RootStack() {
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
    <NavigationContainer>
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
            headerTitle: '首页',
            headerShown: false,
            headerStyle: {backgroundColor: '#0ff'},
          }}
          name="BottomTabs"
          component={BottomTabs}
        />
        <Stack.Screen
          options={getAlbumOptions}
          name="Album"
          component={Album}
        />
        <Stack.Screen
          name={'Category'}
          component={Category}
          options={{
            headerTitle: '分类',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerBackground: {
    opacity: 0,
  },
});
