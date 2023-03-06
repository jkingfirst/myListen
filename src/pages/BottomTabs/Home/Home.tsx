import React, {useEffect} from 'react';
import {View} from 'react-native';
import {RootStackNavigation} from '@t/navigation';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from '@m/index';
import Carousel from './components/Carousels';
const mapStateToProps = ({home}: RootState) => ({
  carousels: home.carousels,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface HomeProps extends ModelState {
  navigation: RootStackNavigation;
}
function Home(props: HomeProps) {
  const {carousels} = props;
  useEffect(() => {
    const {dispatch} = props;
    dispatch({
      type: 'home/fetchCarousel',
    });
  }, []);
  return (
    <View>
      <Carousel data={carousels} />
    </View>
  );
}
export default connector(Home);
