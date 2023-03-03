import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Detail} from '@p/index';
import BottomTabs from '@n/BottomTabs';
import {RootStackParamsList} from '@t/navigation';
const Stack = createNativeStackNavigator<RootStackParamsList>();
export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          gestureEnabled: true,
          animation: 'slide_from_right',
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
          options={{
            headerTitle: '详情页',
            headerStyle: {backgroundColor: 'papayawhip'},
          }}
          name="Detail"
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
