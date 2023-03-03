import RootStack from '@n/RootStack';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from '@conf/dva';
export default function App() {
  return (
    <Provider store={store}>
      <RootStack />
      <StatusBar backgroundColor="transparent" translucent />
    </Provider>
  );
}
