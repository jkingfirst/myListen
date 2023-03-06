import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackNavigation} from '@t/navigation';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from '@m/index';
import Config from 'react-native-config';
const mapStateToProps = ({home}: RootState) => ({
  carousels: home.carousels,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface HomeProps extends ModelState {
  navigation: RootStackNavigation;
}
function Home(props: HomeProps) {
  const {navigation} = props;
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
  const addAsync = () => {
    console.log('异步');
    const {dispatch} = props;
    dispatch({
      type: 'home/addAsync',
      payload: {
        num: 20,
      },
    });
  };
  const {dispatch} = props;
  useEffect(() => {
    console.log('加载。。。。');
    dispatch({
      type: 'home/fetchCarousel',
    });
  }, [dispatch]);
  return (
    <View>
      <Text>hello</Text>
      <Button title={'点击'} onPress={add} />
      <Text>{Config.API_URL}334</Text>
      <Button title={'异步电机'} onPress={addAsync} />
      <Button title={'点击详情'} onPress={toDetail} />
    </View>
  );
}
export default connector(Home);
