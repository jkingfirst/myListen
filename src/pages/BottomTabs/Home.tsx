import React from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackNavigation} from '@t/navigation';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from '@m/index';
const mapStateToProps = ({home}: RootState) => ({
  num: home.num,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface HomeProps extends ModelState {
  navigation: RootStackNavigation;
}
function Home(props: HomeProps) {
  const {navigation, num} = props;
  const toDetail = () => {
    navigation.navigate('Detail');
  };
  const add = () => {
    const {dispatch} = props;
    dispatch({
      type: 'home/add',
      payload: {
        num: 10,
      },
    });
  };
  return (
    <View>
      <Text>{num}</Text>
      <Button title={'点击'} onPress={add} />
      <Button title={'点击详情'} onPress={toDetail} />
    </View>
  );
}
export default connector(Home);
