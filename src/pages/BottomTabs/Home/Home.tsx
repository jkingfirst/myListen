import React, {useState} from 'react';
import {View, FlatList, ListRenderItemInfo} from 'react-native';
import {RootStackNavigation} from '@t/navigation';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from '@m/index';
import Carousel from '@p/BottomTabs/Home/components/Carousels';
import Guesses from '@p/BottomTabs/Home/components/Guesses';
import {IChannel} from '@t/home';
import {useMount} from '@u/customHooks';
import ChannelItem from '@p/BottomTabs/Home/components/Channel/ChannelItem';
const mapStateToProps = ({home}: RootState) => ({
  carousels: home.carousels,
  channels: home.channels,
});
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface HomeProps extends ModelState {
  navigation: RootStackNavigation;
}
function Home(props: HomeProps) {
  const [refresh, setRefresh] = useState(false);
  const {carousels, channels, dispatch} = props;
  useMount(() => {
    dispatch({
      type: 'home/fetchChannel',
    });
    dispatch({
      type: 'home/fetchCarousel',
    });
  });
  const renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} />;
  };
  const getHeader = () => {
    return (
      <View>
        <Carousel data={carousels} />
        <Guesses />
      </View>
    );
  };
  const onRefresh = () => {
    setRefresh(true);
    dispatch({
      type: 'home/fetchChannel',
    }),
      dispatch({
        type: 'home/fetchCarousel',
      });
    setRefresh(false);
  };
  return (
    <View>
      <FlatList
        ListHeaderComponent={getHeader}
        data={channels}
        renderItem={renderItem}
        refreshing={refresh}
        onRefresh={onRefresh}
      />
    </View>
  );
}
export default connector(Home);
