import React from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackNavigation} from '@t/navigation';
interface HomeProps {
  navigation: RootStackNavigation;
}
export default function Home(props: HomeProps) {
  const {navigation} = props;
  const toDetail = () => {
    navigation.navigate('Detail');
  };
  return (
    <View>
      <Text>hello word</Text>
      <Button title={'点击详情'} onPress={toDetail} />
    </View>
  );
}
