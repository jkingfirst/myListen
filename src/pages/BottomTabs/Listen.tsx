import React from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackNavigation} from '@t/navigation';
interface Iprops {
  navigation: RootStackNavigation;
}
export default function Listen(props: Iprops) {
  const {navigation} = props;
  const onPress = () => {
    navigation.setOptions({
      title: '',
      headerTintColor: '#f00',
      headerStyle: {
        backgroundColor: '#ff0',
      },
    });
  };
  return (
    <View>
      <Text>我听</Text>
      <Button title={'点击'} onPress={onPress} />
    </View>
  );
}
